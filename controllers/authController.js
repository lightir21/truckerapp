import User from "../models/User.js";
import { UnauthenticatedError, BadRequestError } from "../errors/index.js";
import dotenv from "dotenv";
import StatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";

dotenv.config();

const register = async (req, res) => {
  const { userName, password, adminPassword, role } = req.body;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    throw new UnauthenticatedError("Please provide correct admin password");
  }

  if (!userName || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({ userName });
  if (userAlreadyExists) {
    throw new BadRequestError("UserName already in use");
  }

  const user = await User.create({ userName, password, role });
  const token = user.createJWT();

  res.cookie("token", token, {});

  res.status(StatusCodes.CREATED).json({
    user: {
      userName: user.userName,
      name: user.name,
      lastName: user.lastName,
      image: user.image,
    },
  });
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({ userName }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.cookie("token", token);

  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({ msg: "logged out successfully" });
};

const updateImage = async (req, res) => {
  const fileStr = req.body.data;
  const uploadedResponse = await cloudinary.uploader.upload(fileStr);
  const { secure_url } = uploadedResponse;

  const token = req.cookies.token;

  if (!token) {
    throw new BadRequestError("No token found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userId = decoded.userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new UnauthenticatedError("Unauthorized");
  }

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { image: secure_url },
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ user: updatedUser });
};

const checkAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    throw new BadRequestError("No token found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userId = decoded.userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new UnauthenticatedError("Unauthorized");
  }

  if (user.role === "admin") {
    res.status(StatusCodes.OK).json({ isTrue: true });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ isTrue: false });
  }
};

export { register, login, checkAdmin, logout, updateImage };

import User from "../models/User.js";
import { UnauthenticatedError, BadRequestError } from "../errors/index.js";
import dotenv from "dotenv";
import StatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

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

  res.status(StatusCodes.CREATED).json({
    user: {
      userName: user.userName,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
    },
    token,
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

  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

const checkAdmin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new BadRequestError("No token found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded._id;
  const user = await User.findOne({ userId });

  if (!user) {
    throw new UnauthenticatedError("Unauthorized");
  }

  if (user.role === "admin") {
    res.status(StatusCodes.OK).json({ isTrue: true });
  } else {
    res.status(StatusCodes.OK).json({ isTrue: false });
  }
};

export { register, login, checkAdmin };

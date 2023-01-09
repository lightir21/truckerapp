import User from "../models/User.js";
import { UnauthenticatedError, BadRequestError } from "../errors/index.js";
import dotenv from "dotenv";
import StatusCodes from "http-status-codes";

dotenv.config();

const addNewDriver = async (req, res) => {
  const { name, lastName, password, truckNum, userName } = req.body;

  const userAlreadyExists = await User.findOne({ userName });
  if (userAlreadyExists) {
    throw new BadRequestError("UserName already in use");
  }

  const user = await User.create({
    userName,
    password,
    name,
    lastName,
    truckNum,
  });
  // const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      userName: user.userName,
      name: user.name,
      lastName: user.lastName,
      truckNum: user.truckNum,
    },
  });
};

const getAllDrivers = async (req, res) => {
  const drivers = await User.find({ role: "driver" });

  res.status(StatusCodes.OK).json({ drivers });
};

const getDriver = async (req, res) => {
  const { id } = req.params;
  const driver = await User.findById(id);

  if (!driver) {
    throw new BadRequestError("No driver with that ID");
  }

  res.status(StatusCodes.OK).json({ user: driver });
};

const updateDriver = async (req, res) => {
  const { id: driverId } = req.params;

  const { truckNum } = req.body;

  const driver = await User.findById(driverId);

  if (!driver) {
    throw new BadRequestError("No driver with that ID");
  }

  driver.truckNum = truckNum;

  const updatedDriver = await User.findByIdAndUpdate(driverId, driver, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json(updatedDriver);
};

export const setProfilePic = (req, res, next) => {};

export { addNewDriver, getAllDrivers, getDriver, updateDriver };

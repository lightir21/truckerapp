import Job from "../models/Job.js";
import { UnauthenticatedError, BadRequestError } from "../errors/index.js";
import StatusCodes from "http-status-codes";

const addNewJob = async (req, res) => {
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobsByDate = async (req, res) => {
  const { driverId, date } = req.body;

  if (!driverId || !date) {
    throw new BadRequestError("must provide  date and driverId");
  }

  const jobs = await Job.find({
    createdFor: driverId,
    date: date,
  });
  res.status(StatusCodes.OK).json(jobs);
};

export { addNewJob, getAllJobsByDate };

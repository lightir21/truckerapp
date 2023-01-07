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

const deleteJob = async (req, res) => {
  const { jobId } = req.body;
  console.log(req.body);

  const job = Job.findById(jobId);

  if (!job) {
    throw new BadRequestError("No job with that id");
  }

  await job.remove();

  res.status(StatusCodes.OK).json({ msg: "Job removed" });
};

const updateJob = async (req, res) => {
  const { _id: jobId, date } = req.body;

  if (!jobId) {
    throw new BadRequestError("No job with that id");
  }

  if (!date) {
    throw new BadRequestError("Job must have a date");
  }

  console.log(req.body);

  const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

export { addNewJob, getAllJobsByDate, deleteJob, updateJob };

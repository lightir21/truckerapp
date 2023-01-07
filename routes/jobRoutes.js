import express from "express";
const router = express.Router();

import {
  addNewJob,
  getAllJobsByDate,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";

router.route("/").post(addNewJob).delete(deleteJob).patch(updateJob);
router.route("/getJobs").post(getAllJobsByDate);

export default router;

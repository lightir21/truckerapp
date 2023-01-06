import express from "express";
const router = express.Router();

import {
  addNewJob,
  getAllJobsByDate,
  deleteJob,
} from "../controllers/jobController.js";

router.route("/").post(addNewJob).delete(deleteJob);
router.route("/getJobs").post(getAllJobsByDate);

export default router;

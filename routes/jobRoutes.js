import express from "express";
const router = express.Router();

import { addNewJob, getAllJobsByDate } from "../controllers/jobController.js";

router.route("/").post(addNewJob);
router.route("/getJobs").post(getAllJobsByDate);

export default router;

import express from "express";
const router = express.Router();

import { addNewJob, getAllJobsByDate } from "../controllers/jobController.js";

router.route("/").post(addNewJob).get(getAllJobsByDate);

export default router;

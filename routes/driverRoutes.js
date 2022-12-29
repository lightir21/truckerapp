import express from "express";
const router = express.Router();

import {
  addNewDriver,
  getAllDrivers,
  getDriver,
} from "../controllers/driverController.js";

router.route("/").post(addNewDriver).get(getAllDrivers);
router.route("/:id").get(getDriver);

export default router;

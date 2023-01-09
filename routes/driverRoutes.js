import express from "express";
const router = express.Router();

import {
  addNewDriver,
  getAllDrivers,
  getDriver,
  updateDriver,
} from "../controllers/driverController.js";

router.route("/").post(addNewDriver).get(getAllDrivers);
router.route("/:id").get(getDriver).patch(updateDriver);

export default router;

import express from "express";
const router = express.Router();

import { register, login, checkAdmin } from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/checkAuth").post(checkAdmin);

export default router;

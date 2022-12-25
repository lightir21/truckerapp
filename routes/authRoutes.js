import express from "express";
const router = express.Router();

import {
  register,
  login,
  checkAdmin,
  logout,
} from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/checkAuth").post(checkAdmin);
router.route("/logout").post(logout);

export default router;

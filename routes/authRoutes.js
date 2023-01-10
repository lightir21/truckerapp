import express from "express";
const router = express.Router();

import {
  register,
  login,
  checkAdmin,
  logout,
  updateImage,
  updateAdminInfo,
} from "../controllers/authController.js";

router.route("/").patch(updateAdminInfo);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/checkAuth").post(checkAdmin);
router.route("/logout").post(logout);
router.route("/uploadImage").patch(updateImage);

export default router;

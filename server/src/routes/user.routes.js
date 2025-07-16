import { Router } from "express";
import {
	login,
	logout,
	me,
	register,
} from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/log-out").get(isLoggedIn, logout);
router.route("/me").get(isLoggedIn, me);

export default router;

import { Router } from "express";
import {
	getAllMessages,
	getAllUsers,
	sendMessage,
	setMessageSeen,
} from "../controllers/message.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.use(isLoggedIn);

router.route("/get-all-users").get(getAllUsers);
router.route("/get-all-messages/:id").get(getAllMessages);
router.route("/send-message/:id").post(upload.single("image"), sendMessage);
router.route("/set-message-seen/:mid").get(setMessageSeen);

export default router;

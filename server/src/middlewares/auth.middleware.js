import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
	const token = req?.cookies?.accessToken;
	console.log("token ===>", token);
	if (!token) {
		throw new ApiError(403, "UnAuthorized user !");
	}

	try {
		console.log(process.env.ACCESS_TOKEN_SECRET);
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		console.log("decoded ===>", decoded);
		req.user = await User.findById(decoded.id);
		next();
	} catch (error) {
		throw new ApiError(403, "UnAuthorized user !");
	}
});

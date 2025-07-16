import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const generateAccessandRefreshToken = async (id) => {
	try {
		if (!isValidObjectId(id)) {
			throw new ApiError(400, "Invalid objectId !");
		}
		const user = await User.findById(id);
		console.log("user =>", user);
		const accessToken = user.generateAccessToken(id);
		const refreshToken = user.generateRefreshToken(id);
		console.log("a", accessToken, refreshToken);

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(400, "Error while generating tokens !");
	}
};

//register user

export const register = asyncHandler(async (req, res) => {
	//upload image
	const localAvatar = req?.file;

	console.log(localAvatar);
	let avatar = null;
	if (localAvatar) {
		const avatarLocalPath = localAvatar?.path;

		avatar = await uploadToCloudinary(avatarLocalPath);
		if (!avatar) {
			throw new ApiError(400, "image upload Failed !");
		}
	}
	console.log(avatar);

	//take data from

	const { userName, email, password, contact, bio } = req.body;
	console.log(userName);

	//validate data

	if (
		[userName, email, password, contact, bio].some((field) => field?.trim == "")
	) {
		throw new ApiError(400, "All fields Required ! ");
	}

	//check user already exist

	const existingUser = await User.findOne({ email });
	console.log("existingUser", existingUser);
	if (existingUser) {
		throw new ApiError(400, "User Already Exist !");
	}

	//create a new User

	const user = await User.create({
		userName,
		email,
		password,
		contact,
		bio,
		avatar: (avatar && avatar?.url) || "",
	});

	if (!user) {
		throw new ApiError(400, "Error while creating user !");
	}
	console.log("user created");

	const { accessToken = "", refreshToken = "" } =
		await generateAccessandRefreshToken(user._id);

	const cookieOptions = {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true,
	};

	res
		.status(201)
		.cookie("accessToken", accessToken, cookieOptions)
		.cookie("refreshToken", refreshToken, cookieOptions)
		.json(new ApiResponse(201, user, "User Created Successfully !"));
});

//login user
export const login = asyncHandler(async (req, res) => {
	console.log(req.body);

	const { contact = "", email, password } = req.body;
	console.log(contact);

	if ([contact, email, password].some((field) => field == null)) {
		throw new ApiError(400, "All fields Required !");
	}

	const user = await User.findOne({
		$or: [{ email }, { contact }],
	});

	if (!user) {
		throw new ApiError(400, "Invalid credentals ! ");
	}

	const match = user.isPasswordCorrect(password);

	if (!match)
		throw new ApiError(400, "Invalid credentals ! ").json(
			new ApiResponse(201, user, "User Created Successfully !")
		);

	const { accessToken = "", refreshToken = "" } =
		await generateAccessandRefreshToken(user._id);

	const cookieOptions = {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true,
	};

	res
		.status(201)
		.cookie("accessToken", accessToken, cookieOptions)
		.cookie("refreshToken", refreshToken, cookieOptions)
		.json(new ApiResponse(201, user, "User login Successfully !"));
});
export const logout = asyncHandler(async (req, res) => {
	res
		.status(200)
		.clearCookie("accessToken")
		.clearCookie("refreshToken")
		.json(
			new ApiResponse(200, { success: true }, "user logout successfully !")
		);
});
export const me = asyncHandler(async (req, res) => {
	res
		.status(200)
		.json(
			new ApiResponse(200, req?.user, "user details fetched Successfully !")
		);
});

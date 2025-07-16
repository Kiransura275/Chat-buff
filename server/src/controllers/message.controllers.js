import { isValidObjectId } from "mongoose";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import io, { socketList } from "../index.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({
		id: { $ne: req.user._id },
	}).select("id userName avatar bio contact");
	console.log(users);

	const unSeenMessages = {};

	const messages = await Message.find({
		sender: { $ne: mongoose.Types.ObjectId(req.user._id) },
	});
	console.log(messages);

	Array(messages).forEach((mes) => {
		if (mes.receiver == req.user._id)
			unSeenMessages[mes.sender] = (unSeenMessages[mes.sender] || 1) + 1;
	});

	res
		.status(200)
		.json(
			new ApiResponse(
				200,
				{ users, unSeenMessages },
				"messages fetched Syccessfully !"
			)
		);
});
export const getAllMessages = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		throw new ApiError(400, "Invalid objectId !");
	}
	const messages = await Message.find({
		$or: [
			{
				sender: id,
				receiver: req.user._id,
			},
			{
				receiver: id,
				sender: req.user._id,
			},
		],
	});

	if (!messages) {
		throw new ApiError(400, "Error while fetching Messages");
	}
	// update all messages status to seen :true in which sender is id  or reciever is id

	const updatedMessages = await Message.updateMany(
		{
			$or: [
				{
					sender: id,
					receiver: req.user._id,
				},
				{
					receiver: id,
					sender: req.user._id,
				},
			],
		},
		{ seen: true },
		{
			new: true,
		}
	);

	console.log(updatedMessages);

	res
		.status(200)
		.json(new ApiResponse(200, messages, "messages fetched Syccessfully !"));
});
export const sendMessage = asyncHandler(async (req, res) => {
	console.log("sending message");
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		throw new ApiError(400, "Invalid objectId !");
	}
	const message = req.body.message || "";

	console.log("message", message);

	const localImage = req.file;
	console.log("localImage", localImage);
	let image = null;
	if (localImage) {
		const imageLocalPath = localImage?.path;

		image = await uploadToCloudinary(imageLocalPath);
		if (!image) {
			throw new ApiError(400, "image upload Failed !");
		}
	}

	const newMessage = await Message.create({
		sender: req.user._id,
		receiver: id,
		message,
		image: image ? image?.url : "",
		seen: false,
	});

	console.log("new message ===>", newMessage);

	if (!newMessage) {
		throw new ApiError(400, "Error while creating message !");
	}
	if (socketList[req.user._id]) {
		io.to(socketList[id]).emit("message", newMessage);
	}
	res
		.status(201)
		.json(new ApiResponse(201, newMessage, "message Sent Successfully !"));
});

export const setMessageSeen = asyncHandler(async (req, res) => {
	const { mid } = req.params;
	if (!isValidObjectId(mid)) {
		throw new ApiError(400, "Invalid objectId !");
	}

	const updateMessageStatus = await Message.findByIdAndUpdate(
		mid,
		{
			$set: {
				seen: true,
			},
		},
		{ new: true }
	);

	if (!updateMessageStatus) {
		throw new ApiError(400, "Error while toggling statuses");
	}

	res
		.status(200)
		.json(
			new ApiResponse(
				200,
				updateMessageStatus,
				"Message Status Updated Successfully !"
			)
		);
});

import { model, Schema } from "mongoose";

const messageSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiver: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
		},
		seen: {
			type: Boolean,
			default: false,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const Message = model("Message", messageSchema);

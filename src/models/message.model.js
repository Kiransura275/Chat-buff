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
			required: true,
		},
		photo: {
			type: {
				url: "",
			},
			default: {
				url: "https://placehold.co/400",
			},
		},
	},
	{ timestamps: true }
);

export const Message = model("Message", messageSchema);

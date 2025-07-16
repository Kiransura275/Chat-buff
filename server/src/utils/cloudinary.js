import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config({
	path: "./.env",
});

import fs from "fs";

cloudinary.config({
	cloud_name: "fun-tube",
	api_key: "586212989776993",
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadToCloudinary = async (localpath) => {
	try {
		console.log(localpath);
		if (!localpath) return null;
		const uploadStatus = await cloudinary.uploader.upload(localpath, {
			resource_type: "auto",
		});
		console.log("file uploaded");
		console.log(uploadStatus);

		return uploadStatus;
	} catch (error) {
		console.error("Error : while uploading to cloudinary");
		return null;
	}
};

// export const destroyFromCloudinary = async (path) => {
// 	try {
// 		if (!path) return null;
// 		const publicId = extractPublicId(path);

// 		const result = await cloudinary.v2.uploader.destroy(publicId, {
// 			resource_type: "auto",
// 		});

// 		return result;
// 	} catch (error) {
// 		console.error("Error : while deleting from cloudinary");
// 		return null;
// 	}
// };

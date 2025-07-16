import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

import app from "./app.js";
import connectDb from "./db/index.js";

dotenv.config({
	path: "./.env",
});

const port = process.env.PORT || 8000;

const server = http.createServer(app);

export const socketList = {};

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;
	socketList[userId] = socket.id;

	socket.on("disconnect", () => {
		delete socketList[userId];
	});
});

connectDb().then(() => {
	server.on("error", () => {
		console.log("Error While talking to Express !");
	});
	server.listen(port, () => {
		console.log(`Server is running on ${port}`);
	});
});

export default io;

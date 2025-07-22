import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
	cors({
		origin: "https://chat-buff-38z1-client.vercel.app",
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public/images"));
app.use(cookieParser());

//routes
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

//test
app.get("", (req, res) => res.send("hello"));

export default app;

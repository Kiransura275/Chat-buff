import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
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

export default app;

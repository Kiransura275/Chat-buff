import dotenv from "dotenv";
import app from "./app.js";
import dbConnect from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

dbConnect().then(() => {
  app.on("error", () => {
    console.log("Error While talking to Express !");
  });
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});

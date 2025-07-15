import { connect } from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config();

const dbConnect = () => {
  const connectionInstance = connect(`${process.env.MONGOOSE_URL} / ${DB_NAME}`)
    .then(() => {
      console.log("Db connected ..");
      console.log(connectionInstance.connection.host);
    })
    .catch((error) => console.error("faliure in conection ", error));
};

export default dbConnect;

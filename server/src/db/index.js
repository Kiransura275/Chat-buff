import { connect } from "mongoose";

const connectDb = async () => {
	try {
		const connection = await connect(process.env.MONGOOSE_URL);
		console.log(`MongoDB connected : ${connection.connection.host}`);
	} catch (error) {
		console.log("error while connecting db !");
		process.exit(1);
	}
};

export default connectDb;

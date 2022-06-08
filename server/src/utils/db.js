import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.DB_URL;

mongoose
	.connect(URL, {})
	.then(() => {
		console.log("databse connected successfully");
	})
	.catch((err) => {
		console.log("error connecting database", err);
	});

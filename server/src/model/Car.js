import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
	name: {
		type: String,
	},
	color: {
		type: String,
	},
	model: {
		type: String,
	},
	make: {
		type: String,
	},
	registrationNo: {
		type: String,
	},
});

export default mongoose.model("Car", CarSchema);

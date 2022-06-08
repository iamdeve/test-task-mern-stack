import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
	category: {
		type: String,
	},
});

export default mongoose.model("Category", CategorySchema);

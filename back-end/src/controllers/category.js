import Category from "../model/Category.js";
import Car from "../model/Car.js";
import { categoryValidation } from "../utils/validation.js";
export const addCategory = async (req, res) => {
	try {
		await categoryValidation.validateAsync(req.body);
		const { category } = req.body;
		let newCategory = new Category({
			category,
		});
		await newCategory.save();
		return res.status(201).json(newCategory);
	} catch (err) {
		console.log(err);
		console.log(err);
		if (err.details) {
			err = err.details.map((det) => det.message);
		} else {
			err = err.message;
		}
		return res.status(400).json({ error: JSON.parse(JSON.stringify(err)) });
	}
};
export const updateCategory = async (req, res) => {
	try {
		await categoryValidation.validateAsync(req.body);
		const { category } = req.body;
		let update = await Category.updateOne({ _id: req.params.id }, { category }, { upsert: true });
		return res.status(200).json(update);
	} catch (err) {
		console.log(err);
		if (err.details) {
			err = err.details.map((det) => det.message);
		} else {
			err = err.message;
		}
		return res.status(400).json({ error: JSON.parse(JSON.stringify(err)) });
	}
};
export const deleteCategory = async (req, res) => {
	try {
		await Category.findByIdAndDelete(req.params.id);
		await Car.deleteMany({ categoryId: req.params.id });
		return res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: err });
	}
};
export const getCategoreis = async (req, res) => {
	try {
		return res.json(res.paginatedResults);
	} catch (err) {
		return res.status(400).json({ error: err });
	}
};

import Car from "../model/Car.js";
import { carValidation } from "../utils/validation.js";
export const addCar = async (req, res) => {
	try {
		await carValidation.validateAsync(req.body);
		const { categoryId, name, color, model, make, registrationNo } = req.body;
		let newCar = new Car({
			categoryId,
			name,
			color,
			model,
			make,
			registrationNo,
		});
		await newCar.save();
		return res.status(201).json(newCar);
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
export const updateCar = async (req, res) => {
	try {
		await carValidation.validateAsync(req.body);
		const { categoryId, name, color, model, make, registrationNo } = req.body;
		let update = await Car.updateOne({ _id: req.params.id }, { categoryId, name, color, model, make, registrationNo }, { upsert: true });
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
export const deleteCar = async (req, res) => {
	try {
		await Car.findByIdAndDelete(req.params.id);
		return res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: err });
	}
};
export const getCars = async (req, res) => {
	try {
		return res.json(res.paginatedResults);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: err });
	}
};
export const getCarsByCategory = async (req, res) => {
	try {
		let cars = await Car.find({ categoryId: req.body.categoryId });
		return res.status(200).json({ cars });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: err });
	}
};

import User from "../model/User.js";
import { passwordGenerator } from "../utils/utilities.js";
import { userSignupValidation, userLoginValidation } from "../utils/validation.js";
import { sendMail } from "../utils/sendMail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const salt = 10;
export const signup = async (req, res) => {
	try {
		await userSignupValidation.validateAsync(req.body);
		const { name, email } = req.body;
		let checkUser = await User.find({ email: email });
		if (checkUser.length > 0) {
			return res.status(400).json({ error: "User already exist" });
		}
		let password = passwordGenerator(8);
		let hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		await sendMail(email, password);
		return res.status(201).json(newUser);
	} catch (err) {
		console.log(err);
		if (err.details) {
			err = err.details.map((det) => det.message);
		} else {
			err = err.message;
		}
		return res.status(500).json({ error: JSON.parse(JSON.stringify(err)) });
	}
};
export const signin = async (req, res) => {
	try {
		await userLoginValidation.validateAsync(req.body);
		const { email } = req.body;
		let checkUser = await User.findOne({ email: email });
		if (!checkUser) {
			return res.status(400).json({ error: "No User exist with given email" });
		}
		let verifyPassword = await bcrypt.compare(req.body.password, checkUser.password);
		if (!verifyPassword) {
			return res.status(400).json({ error: "Wrong Password" });
		}
		let token = jwt.sign(JSON.parse(JSON.stringify(checkUser)), process.env.JWT_SECRET, { expiresIn: "1h" });
		res.status(200).json({ token });
	} catch (err) {
		console.log(err);
		if (err.details) {
			err = err.details.map((det) => det.message);
		} else {
			err = err.message;
		}
		return res.status(500).json({ error: JSON.parse(JSON.stringify(err)) });
	}
};

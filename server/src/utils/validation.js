import joi from "joi";

export const userSignupValidation = joi.object({
	name: joi.string().min(3).max(30).required(),
	email: joi.string().email(),
});

export const userLoginValidation = joi.object({
	password: joi.string().required(),
	email: joi.string().email(),
});

export const categoryValidation = joi.object({
	category: joi.string().required(),
});
export const carValidation = joi.object({
	name: joi.string().required(),
	categoryId: joi.string().required(),
	color: joi.string().required(),
	model: joi.string().required(),
	make: joi.string().required(),
	registrationNo: joi.string().required(),
});

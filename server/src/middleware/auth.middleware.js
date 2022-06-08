import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authentication = async (req, res, next) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
		res.status(401).send({ message: "Unauthorized!" });
	} else {
		try {
			let token = req.headers.authorization.split("Bearer ")[1];
			console.log(token);
			let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
			if (verifyToken.exp * 1000 > Date.parse(new Date())) {
				req.user = verifyToken;
				next();
			} else {
				res.status(401).json({ message: "Authentication token is expired" });
			}
		} catch (err) {
			console.log(err);
			res.status(401).json({ message: "Unauthorized!!" });
		}
	}
};

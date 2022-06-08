import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes/index.js";
import morgan from "morgan";

import "./src/utils/db.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use(routes);

const PORT = process.env.port;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

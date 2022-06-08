import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/user.js";
import { addCar, updateCar, deleteCar, getCars } from "../controllers/car.js";
import { addCategory, updateCategory, deleteCategory, getCategoreis } from "../controllers/category.js";
import { authentication } from "../middleware/auth.middleware.js";
import { paginatedResults } from "../middleware/pagination.middleware.js";
import Category from "../model/Category.js";
import Car from "../model/Car.js";

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/car", authentication, addCar);
router.get("/cars", [authentication, paginatedResults(Car)], getCars);
router.put("/car/:id", authentication, updateCar);
router.delete("/car/:id", authentication, deleteCar);

router.post("/category", authentication, addCategory);
router.get("/categories", [authentication, paginatedResults(Category)], getCategoreis);
router.put("/category/:id", authentication, updateCategory);
router.delete("/category/:id", authentication, deleteCategory);
export default router;

import express from "express";
import { getAllCategories, addCategory, deleteCategory, getUpdateCategoryId, putUpdateCategoryId } from "../controllers/categoryController.js";
import adminAuth from "../middlewares/adminAuth.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", getAllCategories);
categoryRouter.post("/add", adminAuth, addCategory);
categoryRouter.delete("/remove", adminAuth, deleteCategory);

categoryRouter.get('/update/:id/edit', adminAuth, getUpdateCategoryId);
categoryRouter.put('/update/:id', adminAuth, putUpdateCategoryId);

export default categoryRouter;

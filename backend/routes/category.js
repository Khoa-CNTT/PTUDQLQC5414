import express from "express";
import { getAllCategories, addCategory, deleteCategory, getUpdateCategoryId, putUpdateCategoryId } from "../controllers/categoryController.js";
import adminAuth from "../middlewares/adminAuth.js";

const categoryRouter = express.Router();

//get
categoryRouter.get("/list", getAllCategories);
//post
categoryRouter.post("/add", adminAuth, addCategory);
//put
categoryRouter.get('/update/:id/edit', adminAuth, getUpdateCategoryId);
categoryRouter.put('/update/:id', adminAuth, putUpdateCategoryId);
//delete
categoryRouter.delete("/remove", adminAuth, deleteCategory);

export default categoryRouter;

import express from "express";
import { getReviewsByProduct, createReview } from "../controllers/reviewController.js";
import authUser from "../middlewares/authUser.js";

const reviewRouter = express.Router();

reviewRouter.get("/:productId", getReviewsByProduct);
reviewRouter.post("/", authUser, createReview);

export default reviewRouter;

import express from "express";
import { getRevenueByDay, getRevenueByWeek, getRevenueByMonth } from "../controllers/statsController.js";
import adminAuth from "../middlewares/adminAuth.js";

const statsRouter = express.Router();

statsRouter.get('/revenue-by-day', adminAuth, getRevenueByDay);
statsRouter.get('/revenue-by-week', adminAuth, getRevenueByWeek);
statsRouter.get('/revenue-by-month', adminAuth, getRevenueByMonth);

export default statsRouter;

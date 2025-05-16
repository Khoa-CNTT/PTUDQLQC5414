import express from "express";
import { forecastBestSeller } from "../controllers/forecastController.js";

const forecastRouter = express.Router();

//
forecastRouter.get("/bestsellers", forecastBestSeller);


export default forecastRouter;
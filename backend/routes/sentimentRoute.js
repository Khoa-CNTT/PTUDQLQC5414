import express from "express";
import { sentiment } from "../controllers/sentimentController.js";

const sentimentRouter = express.Router();

//
sentimentRouter.post("/", sentiment);


export default sentimentRouter;
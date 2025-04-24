import express from 'express';
import { applyCoupon, listCoupon, addCoupon, removeCoupon, getUpdateId, putUpdateId } from '../controllers/couponController.js';
import adminAuth from '../middlewares/adminAuth.js';

const couponRouter = express.Router();

//get
couponRouter.get('/list', listCoupon);
//post
couponRouter.post("/add", adminAuth, addCoupon);
//put
couponRouter.get('/update/:id/edit', adminAuth, getUpdateId);
couponRouter.put('/update/:id', adminAuth, putUpdateId);
//delete
couponRouter.delete('/remove', adminAuth, removeCoupon);
////

//USER
couponRouter.post('/apply', applyCoupon);

export default couponRouter;

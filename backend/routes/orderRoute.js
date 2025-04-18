import express from 'express';
import { checkoutOrder, checkoutOrderPayPal, verifyPaypal,ordersPeronal, allOrders, updateStatus } from '../controllers/orderController.js';
import authUser from '../middlewares/authUser.js'
import adminAuth from '../middlewares/adminAuth.js';

const orderRouter = express.Router();

orderRouter.post('/checkout', authUser, checkoutOrder);
orderRouter.post('/paypal', authUser, checkoutOrderPayPal);

orderRouter.post('/verifypaypal', authUser, verifyPaypal)

//
orderRouter.post('/list-personal', authUser, ordersPeronal);
//admin
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
//
export default orderRouter;
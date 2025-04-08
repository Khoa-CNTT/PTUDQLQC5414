import express from 'express';
import { checkoutOrder, checkoutOrderPayPal, verifyPaypal } from '../controllers/orderController.js';
import authUser from '../middlewares/authUser.js'

const orderRouter = express.Router();

orderRouter.post('/checkout', authUser, checkoutOrder);
orderRouter.post('/paypal', authUser, checkoutOrderPayPal);

orderRouter.post('/verifypaypal', authUser, verifyPaypal)

export default orderRouter;
import { response } from 'express';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import paypalClient from '../config/paypalConfig.js'
import paypal from '@paypal/checkout-server-sdk';

const checkoutOrder = async (req, res) => {
    try {
        // Đảm bảo req.user có giá trị
        if (!req.user) {
            return res.status(400).json({ success: false, message: 'User not authenticated' });
        }

        const user_id = req.user._id; // Lấy userId từ token
        const { items, amount, address } = req.body;

        const orderData = {
            userId: user_id,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Cập nhật dữ liệu giỏ hàng của người dùng
        await userModel.findByIdAndUpdate(user_id, { cartData: {} });

        res.json({ success: true, message: 'Order Placed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const checkoutOrderPayPal = async (req, res) => {
    try {
        // Đảm bảo req.user có giá trị
        if (!req.user) {
            return res.status(400).json({ success: false, message: 'User not authenticated' });
        }

        const user_id = req.user._id; // Lấy userId từ token
        const { items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId: user_id,
            items,
            address,
            amount,
            paymentMethod: 'PayPal',
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount.toString(),
                },
                description: "Order"
            }],
            application_context: {
                return_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`
            }
        });

        const response = await paypalClient.execute(request);
        const approvalUrl = response.result.links.find(link => link.rel === 'approve').href;

        res.json({ success: true, approvalUrl });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyPaypal = async (req, res) => {
    // Đảm bảo req.user có giá trị
    if (!req.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const user_id = req.user._id; // Lấy userId từ token

    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(user_id, { cartData: {} });
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { checkoutOrder, checkoutOrderPayPal, verifyPaypal, allOrders, updateStatus };

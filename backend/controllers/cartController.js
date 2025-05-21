import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size, subCategory } = req.body;

        if (!userId || !itemId || !size || !subCategory) {
            return res.status(400).json({ success: false, message: "Missing data" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) cartData[itemId] = {};
        if (!cartData[itemId][size]) cartData[itemId][size] = {};

        if (cartData[itemId][size][subCategory]) {
            cartData[itemId][size][subCategory] += 1;
        } else {
            cartData[itemId][size][subCategory] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Added To Cart' });
    } catch (error) {
        console.log("Add to cart error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: 'Cart Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };

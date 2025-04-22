import couponModel from "../models/couponModel.js";

const applyCoupon = async (req, res) => {
    const { code, orderTotal } = req.body;

    try {
        const coupon = await couponModel.findOne({ code: code.trim(), isActive: true });

        if (!coupon) return res.status(404).json({ error: 'Mã giảm giá không hợp lệ' });

        const now = new Date();
        if (now < coupon.startDate || now > coupon.endDate) {
            return res.status(400).json({ error: 'Mã đã hết hạn hoặc chưa bắt đầu' });
        }

        if (orderTotal < coupon.minOrder) {
            return res.status(400).json({ error: 'Đơn hàng chưa đủ điều kiện' });
        }

        let discount = 0;
        if (coupon.type === 'percentage') {
            discount = (coupon.value / 100) * orderTotal;
        } else {
            discount = coupon.value;
        }

        res.json({
            success: true,
            discount: Math.floor(discount),
            finalTotal: orderTotal - discount
        });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};

export { applyCoupon }

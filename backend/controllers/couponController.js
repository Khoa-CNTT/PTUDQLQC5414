import couponModel from "../models/couponModel.js";

const listCoupon = async (req, res) => {
    try {
        const coupons = await couponModel.find({});
        res.json({ success: true, coupons })
    } catch (err) {
        console.eror(err);
        res.json({ success: false, message: err.message })
    }
}

const addCoupon = async (req, res) => {
    try {
        const { code,
            type,
            value,
            minOrder } = req.body;

        const exists = await couponModel.findOne({ code });
        if (exists) return res.json({ success: false, message: "coupon already exists" });

        const coupon = new couponModel({
            code,
            type,
            value,
            minOrder
        });
        await coupon.save();

        res.json({ success: true, message: "coupon added" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

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

const getUpdateId = async (req, res) => {
    try {
        const couponId = req.params.id;

        // Tìm sản phẩm theo ID
        const coupon = await couponModel.findById(couponId); // ID thử nghiệm

        if (!coupon) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }

        // Trả về thông tin sản phẩm nếu tìm thấy
        res.status(200).json(coupon);

    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: 'Lỗi server: ' + error.message });
    }
};

const putUpdateId = async (req, res) => {
    try {
        await couponModel.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const removeCoupon = async (req, res) => {
    try {
        await couponModel.deleteOne({ _id: req.body._id })
        res.json({ success: true, message: "Coupon deleted successfully" })
    } catch (err) {

    }
}

export { applyCoupon, listCoupon, addCoupon, removeCoupon, getUpdateId, putUpdateId }

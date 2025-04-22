import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Mã: VD SALE10
    type: { type: String, enum: ['percentage', 'fixed'], required: true }, // percentage: giảm %, fixed: giảm số tiền
    value: { type: Number, required: true }, // % hoặc số tiền
    minOrder: { type: Number, default: 0 }, // đơn hàng tối thiểu
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
});

const couponModel = mongoose.models.coupon || mongoose.model("Coupon", couponSchema)

export default couponModel

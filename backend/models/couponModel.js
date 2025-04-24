import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Mã: VD SALE10
    type: { type: String, enum: ['percentage', 'fixed'], required: true }, // percentage: giảm %, fixed: giảm số tiền
    value: { type: Number, required: true }, // % hoặc số tiền
    minOrder: { type: Number, default: 0 }, // đơn hàng tối thiểu
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // mặc định +7 ngày    
    isActive: { type: Boolean, default: true }
});

const couponModel = mongoose.models.coupon || mongoose.model("Coupon", couponSchema)

export default couponModel

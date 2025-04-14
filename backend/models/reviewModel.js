import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true }, // từ 1 đến 5 sao
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel;

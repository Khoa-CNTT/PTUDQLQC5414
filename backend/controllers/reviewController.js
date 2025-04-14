import reviewModel from '../models/reviewModel.js'

// Lấy tất cả đánh giá theo productId
const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ productId: req.params.productId }).sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi lấy đánh giá" });
    }
};

// Tạo một đánh giá mới
const createReview = async (req, res) => {
    try {
        const { productId, username, rating, comment } = req.body;
        const newReview = new reviewModel({ productId, username, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi thêm đánh giá" });
    }
};

export { getReviewsByProduct, createReview }
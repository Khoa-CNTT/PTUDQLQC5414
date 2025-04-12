import express from 'express';
import Review from '../models/reviewModel.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

// Lấy tất cả đánh giá theo productId
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Gửi đánh giá mới (yêu cầu đăng nhập)
router.post('/:productId', authUser, async (req, res) => {
  const { rating, comment } = req.body;
  const name = req.user.name;

  try {
    const review = new Review({
      productId: req.params.productId,
      name,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ message: 'Could not save review' });
  }
});

export default router;

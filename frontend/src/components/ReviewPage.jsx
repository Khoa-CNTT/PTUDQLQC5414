import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext"; // Đảm bảo context này chứa `name` và `setName`

const ReviewPage = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        username: "",  // Không cần khởi tạo name ở đây
        rating: 5,
        comment: "",
    });

    const { token, name } = useContext(ShopContext);

    // Lấy đánh giá từ API khi productId thay đổi
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/reviews/${productId}`)
            .then((res) => setReviews(res.data));
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewToSubmit = {
                username: name,
                rating: newReview.rating,
                comment: newReview.comment,
                productId,
            };

            // Gửi đánh giá lên server
            await axios.post("http://localhost:4000/api/reviews", reviewToSubmit, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Cập nhật hiển thị ngay lập tức
            setReviews([reviewToSubmit, ...reviews]);

            // Reset form
            setNewReview({ username: "", rating: 5, comment: "" });
        } catch (err) {
            console.error("Lỗi khi gửi đánh giá:", err);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>

            {/* Hiển thị tổng số đánh giá */}
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    {reviews.length} review{reviews.length !== 1 ? 's' : ''} so far
                </p>
            </div>

            {/* Form đánh giá */}
            <form onSubmit={handleSubmit} className="mb-6 space-y-3">
                <input
                    type="text"
                    placeholder="Please Login!"
                    value={name}
                    readOnly
                    className="border p-2 w-full bg-gray-100 focus:outline-none"
                />

                <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                    }
                    placeholder="Write your review"
                    required
                    className="border p-2 w-full"
                />

                <select
                    value={newReview.rating}
                    onChange={(e) =>
                        setNewReview({ ...newReview, rating: Number(e.target.value) })
                    }
                    className="border p-2 w-full"
                >
                    {[5, 4, 3, 2, 1].map((s) => (
                        <option key={s} value={s}>
                            {s} stars
                        </option>
                    ))}
                </select>

                <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                    Submit Review
                </button>
            </form>

            {/* Hiển thị danh sách đánh giá */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    reviews.map((r, index) => (
                        <div key={index} className="border p-4 rounded shadow">
                            <p className="font-semibold">{r.username}</p>
                            <p className="text-yellow-500">{"⭐".repeat(r.rating)}</p>
                            <p>{r.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewPage;

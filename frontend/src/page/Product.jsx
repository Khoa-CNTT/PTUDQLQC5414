import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

//  Sản phẩm giả định (nếu không tìm thấy trong context)
const fakeProduct = {
  _id: "fake123",
  name: "Cà phê thử nghiệm",
  price: "50.000",
  image: [assets.a_cup, assets.a_cup],
  sizes: ["S", "M", "L"],
  description: "Đây là một sản phẩm thử nghiệm. Thêm vào giỏ hàng để kiểm tra chức năng.",
  category: "coffee",
  subCategory: "arabica",
};

const Product = () => {
  // Lấy productId từ URL và các hàm, dữ liệu từ ShopContext
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  //  State quản lý dữ liệu sản phẩm, hình ảnh, size, tab đang mở
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  // State đánh giá
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  //  Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Tìm và thiết lập dữ liệu sản phẩm khi component mount
  useEffect(() => {
    const found = products.find((p) => p._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image[0]);
    } else {
      setProductData(fakeProduct);
      setImage(fakeProduct.image[0]);
    }
  }, [productId, products]);

  // Gọi API lấy danh sách đánh giá
  useEffect(() => {
    if (!productId) return;
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reviews/${productId}`);
        const data = await res.json();
        setReviews(data);

        //  Tính trung bình sao
        const avg = data.length ? data.reduce((acc, r) => acc + r.rating, 0) / data.length : 0;
        setAverageRating(avg.toFixed(1));
      } catch (err) {
        console.error("Lỗi lấy đánh giá:", err);
      }
    };
    fetchReviews();
  }, [productId]);

  // Gửi đánh giá mới
  const handleSubmitReview = async () => {
    if (!user) return alert("Vui lòng đăng nhập để gửi đánh giá.");
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Token xác thực
        },
        body: JSON.stringify({
          name: user.name,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gửi đánh giá thất bại");
      }

      //  Cập nhật đánh giá mới vào danh sách
      setReviews([result, ...reviews]);
      setNewReview({ rating: 5, comment: "" });
    } catch (err) {
      console.error("Gửi đánh giá thất bại:", err);
      alert("Có lỗi xảy ra khi gửi đánh giá");
    }
  };

  //  UI chính
  return productData ? (
    <div className="border-t-2 pt-10 bg-white text-black">
      {/* ---------- PHẦN ẢNH & CHI TIẾT SẢN PHẨM ---------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Ảnh sản phẩm & thumbnails */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {productData.image.map((img, i) => (
              <img
                key={i}
                onClick={() => setImage(img)}
                src={img}
                className="w-[24%] sm:w-full sm:mb-3 cursor-pointer"
                alt="thumb"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="product" />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Sao đánh giá */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.round(averageRating) ? assets.star_icon : assets.star_dull_icon}
                className="w-3.5"
                alt="star"
              />
            ))}
            <p className="pl-2">({averageRating})</p>
          </div>

          {/* Giá và mô tả */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-700 md:w-4/5">{productData.description}</p>

          {/* Chọn size */}
          <div className="flex flex-col gap-4 my-8">
            <p>Chọn Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`border py-2 px-4 bg-gray-200 ${
                    size === s ? "border-orange-500" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Nút thêm vào giỏ */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-white border text-black px-8 py-3 text-sm"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-700 mt-5 flex flex-col gap-1">
            <p>Sản phẩm chính hãng 100%.</p>
            <p>Thanh toán khi nhận hàng.</p>
          </div>
        </div>
      </div>

      {/* ---------- TABS: CHI TIẾT & ĐÁNH GIÁ ---------- */}
      <div className="mt-20">
        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("details")}
            className={`border px-5 py-3 text-sm ${
              activeTab === "details" ? "bg-black text-white" : "bg-white"
            }`}
          >
            Chi tiết sản phẩm
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`border px-5 py-3 text-sm ${
              activeTab === "reviews" ? "bg-black text-white" : "bg-white"
            }`}
          >
            Đánh giá ({reviews.length})
          </button>
        </div>

        {/* Nội dung tab Chi tiết */}
        {activeTab === "details" && (
          <div className="border px-6 py-6 text-sm text-gray-700">
            <p>
              <b>Thông tin sản phẩm:</b> {productData.description}
            </p>
          </div>
        )}

        {/* Nội dung tab Đánh giá */}
        {activeTab === "reviews" && (
          <div className="border px-6 py-6 text-sm text-gray-700 space-y-4">
            {/* Form gửi đánh giá */}
            {user && (
              <div>
                <p className="font-semibold mb-2">Viết đánh giá của bạn</p>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={i < newReview.rating ? assets.star_icon : assets.star_dull_icon}
                      className="w-5 cursor-pointer"
                      onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                      alt="rate"
                    />
                  ))}
                </div>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows="3"
                  className="w-full border p-2 text-black"
                  placeholder="Chia sẻ cảm nhận của bạn..."
                />
                <button
                  onClick={handleSubmitReview}
                  className="mt-2 px-4 py-2 bg-black text-white"
                >
                  Gửi đánh giá
                </button>
              </div>
            )}

            {/* Danh sách đánh giá */}
            {reviews.length === 0 ? (
              <p>Chưa có đánh giá nào.</p>
            ) : (
              reviews.map((r, i) => (
                <div key={i} className="border-b pb-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">{r.name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(r.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, j) => (
                      <img
                        key={j}
                        src={j < r.rating ? assets.star_icon : assets.star_dull_icon}
                        className="w-3.5"
                        alt="rated"
                      />
                    ))}
                  </div>
                  <p className="mt-1">{r.comment}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ---------- SẢN PHẨM LIÊN QUAN ---------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    //  Nếu chưa có dữ liệu thì trả về div ẩn
    <div className="opacity-0"></div>
  );
};

export default Product;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import ReviewPage from "../components/ReviewPage";

const Product = () => {
  const { productId } = useParams();  // Lấy productId từ URL
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState();  // Sản phẩm hiện tại
  const [image, setImage] = useState("");  // Hình ảnh sản phẩm
  //
  const [size, setSize] = useState("");  // Kích thước sản phẩm đã chọn
  const [subCategories, setSubcategories] = useState("");  // Kích thước sản phẩm đã chọn
  //
  const [loading, setLoading] = useState(true);  // Trạng thái loading
  const [activeTab, setActiveTab] = useState("description"); // Tab đang được chọn (description hoặc reviews)

  useEffect(() => {
    // Tìm sản phẩm theo productId
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
    setLoading(false);  // Đặt lại trạng thái loading sau khi có dữ liệu
  }, [productId, products]);

  if (loading) {
    return <div>Đang tải...</div>;  // Hiển thị khi đang tải dữ liệu
  }

  return (
    <div className="border-t-2 px-6 pt-8 bg-white text-black transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Hiển thị danh sách ảnh sản phẩm */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="product"
              />
            ))}
          </div>
          {/* Hiển thị ảnh sản phẩm chính */}
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="product" />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Chọn kích thước */}
          <div className="flex flex-col gap-4 my-8">
            <p className="text-base">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-200 ${item === size ? "border-orange-500" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
            {/* // */}
            <p className="text-sm">Sub Category</p>
            <div className="flex gap-2">
              {productData.subCategories.map((item, index) => (
                <button
                  onClick={() => setSubcategories(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-200 ${item === subCategories ? "border-orange-500" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size, subCategories)}
            className="bg-gray-600 border text-white px-8 py-3 text-sm hover:bg-gray-400 hover:text-black"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-700 mt-5 flex flex-col gap-1">
            <p>- The product is 100% genuine and sourced from official suppliers.<br />- Cash on delivery is available for this item.</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-5 flex space-x-8">
        <button
          className={`py-2 px-5 ${activeTab === "description" ? "border-b-2 border-black" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`py-2 px-5 ${activeTab === "reviews" ? "border-b-2 border-black" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Nội dung tùy theo tab */}
      <div className="mt-8">
        {activeTab === "description" ? (
          <div>
            <ul>
              {productData.description.split("\n").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        ) : (
          <ReviewPage productId={productData._id} />
        )}
      </div>

      {/* Hiển thị sản phẩm liên quan */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;

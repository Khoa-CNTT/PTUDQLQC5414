import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateProduct({ token }) {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]); // Mảng subCategories
    const [sizes, setSizes] = useState([]);
    const [bestseller, setBestseller] = useState(false);
    const [categories, setCategories] = useState([]); // Mảng categories từ backend

    useEffect(() => {
        if (!token) return;

        // Fetch thông tin sản phẩm cần cập nhật
        axios.get(`http://localhost:4000/api/product/update/${id}/edit`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const { name, description, image, price, category, subCategories, sizes, bestseller } = res.data;
            setName(name);
            setDescription(description);
            setImage(image);
            setPrice(price);
            setCategory(category);
            setSubCategories(subCategories || []); // Đảm bảo mảng subCategories không rỗng
            setSizes(sizes || []);
            setBestseller(bestseller || false);
        }).catch(err => console.error(err));

        // Fetch danh mục sản phẩm
        axios.get(`http://localhost:4000/api/category/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.success) {
                setCategories(res.data.categories);
            }
        }).catch(err => console.error(err));

    }, [id, token]);

    const toggleSize = (size) => {
        if (sizes.includes(size)) {
            setSizes(sizes.filter(s => s !== size));
        } else {
            setSizes([...sizes, size]);
        }
    };

    const toggleSubCategory = (sub) => {
        setSubCategories((prevSubCategories) => {
            if (prevSubCategories.includes(sub)) {
                return prevSubCategories.filter(s => s !== sub); // Xóa subCategory nếu đã có
            } else {
                return [...prevSubCategories, sub]; // Thêm subCategory nếu chưa có
            }
        });
    };

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        const data = { name, description, image, price, category, subCategories, sizes, bestseller };

        if (!token) return;

        axios.put(`http://localhost:4000/api/product/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                //
                toast.success('Success Update Product!');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Update Products Information</h1>

            <form onSubmit={handleSubmitUpdate} className="flex flex-col gap-4 w-full">
                {/* Upload Image */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Upload Image</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Image URL"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"
                    />
                </div>

                {/* Product Name */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type here"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write content here"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"
                        rows={4}
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Category</label>
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setSubCategories([]); // reset subcategories khi đổi category
                        }}
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Sub Categories */}
                <div className="flex flex-col sm:flex-row gap-2 w-full items-start">
                    <label className="sm:w-1/4 font-semibold mt-2">Sub Categories</label>
                    <div className="flex gap-3 flex-wrap">
                        {categories.find((cat) => cat.name === category)?.subCategories.map((sub, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => toggleSubCategory(sub)}
                                className={`px-4 py-2 rounded border ${subCategories.includes(sub)
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-gray-300'
                                    }`}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="25"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"
                    />
                </div>

                {/* Sizes */}
                <div className="flex flex-col sm:flex-row gap-2 w-full items-start">
                    <label className="sm:w-1/4 font-semibold mt-2">Sizes</label>
                    <div className="flex gap-3">
                        {['M', 'L'].map((size) => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => toggleSize(size)}
                                className={`px-4 py-2 rounded border ${sizes.includes(size)
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-gray-300'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bestseller */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={bestseller}
                        onChange={(e) => setBestseller(e.target.checked)}
                    />
                    <label className="font-medium">Add to bestseller</label>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                    <Link to="/admin-list">
                        <button
                            type="button"
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Back
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProduct;

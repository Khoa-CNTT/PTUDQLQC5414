import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';

const UpdateCategory = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [subCategories, setSubCategories] = useState(['']);

    useEffect(() => {
        if (!token) return;
        axios.get(`${backendUrl}/api/category/update/${id}/edit`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            const { name, subCategories } = res.data.category;
            setName(name);
            setSubCategories(subCategories || ['']);
        }).catch(err => console.error(err));
    }, [id, token]);

    const handleSubCategoryChange = (index, value) => {
        const updatedSubs = [...subCategories];
        updatedSubs[index] = value;
        setSubCategories(updatedSubs);
    };

    const addSubCategory = () => {
        setSubCategories([...subCategories, '']);
    };

    const removeSubCategory = (index) => {
        const updatedSubs = subCategories.filter((_, i) => i !== index);
        setSubCategories(updatedSubs.length > 0 ? updatedSubs : ['']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${backendUrl}/api/category/update/${id}`, {
                name,
                subCategories: subCategories.filter(sub => sub.trim() !== ''),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //
            navigate('/admin-category');
            toast.success('Success Update Category!');
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Update Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Name */}
                <div>
                    <label className="block font-semibold mb-1">Category Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Subcategories */}
                <div>
                    <label className="block font-semibold mb-2">Subcategories</label>
                    {subCategories.map((sub, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={sub}
                                onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                                className="flex-1 border px-3 py-2 rounded"
                                placeholder={`Subcategory ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeSubCategory(index)}
                                className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSubCategory}
                        className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    >
                        + Add Subcategory
                    </button>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <Link to="/admin-category">
                        <button type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                            Back
                        </button>
                    </Link>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCategory;

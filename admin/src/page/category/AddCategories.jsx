import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify';

const AddCategories = ({ token }) => {
    const [name, setName] = useState('');
    const [subCategories, setSubCategories] = useState(['']);

    const handleSubCategoryChange = (index, value) => {
        const newSubCategories = [...subCategories];
        newSubCategories[index] = value;
        setSubCategories(newSubCategories);
    };

    const addSubCategoryField = () => {
        setSubCategories([...subCategories, '']);
    };

    const removeSubCategoryField = (index) => {
        const newSubCategories = subCategories.filter((_, i) => i !== index);
        setSubCategories(newSubCategories);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendUrl}/api/category/add`, {
                name,
                subCategories
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setName('');
                setSubCategories(['']);
                //
                toast.success('Success Add Category!');
            } else {
                toast.error(err);
            }
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md'>
            <h2 className='text-lg font-bold'>Add New Category</h2>

            <div>
                <label className='block mb-1'>Category Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='w-full px-3 py-2 border'
                />
            </div>

            <div>
                <label className='block mb-1'>Subcategories</label>
                {subCategories.map((sub, index) => (
                    <div key={index} className='flex items-center gap-2 mb-2'>
                        <input
                            type="text"
                            value={sub}
                            onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                            required
                            className='flex-1 px-3 py-2 border'
                        />
                        {subCategories.length > 1 && (
                            <button type='button' onClick={() => removeSubCategoryField(index)} className='text-red-500'>X</button>
                        )}
                    </div>
                ))}
                <button type='button' onClick={addSubCategoryField} className='text-blue-500'>+ Add Subcategory</button>
            </div>

            <button type='submit' className='px-4 py-2 bg-black text-white'>Add Category</button>
        </form>
    );
};

export default AddCategories;

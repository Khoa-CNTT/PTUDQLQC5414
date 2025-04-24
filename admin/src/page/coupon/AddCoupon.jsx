import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App';

const AddCoupon = ({ token }) => {
    const [code, setCode] = useState('');
    const [type, setType] = useState('percentage'); // mặc định là 'percentage'
    const [value, setValue] = useState('');
    const [minOrder, setMinOrder] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const newCoupon = {
                code,
                type,
                value,
                minOrder
            };

            const response = await axios.post(`${backendUrl}/api/coupon/add`, newCoupon, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setCode('');
                setType('percentage');
                setValue('');
                setMinOrder('');
                alert("Coupon added successfully!");
            }
        } catch (error) {
            console.error('Error adding coupon:', error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col pl-5 items-start gap-5">
            <h2 className='text-lg font-bold'>Add New Coupon</h2>
            <div>
                <label className="block mb-1">Coupon Code</label>
                <input
                    type="text"
                    value={code}
                    required
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="VD: SALE10"
                />
            </div>

            <div>
                <label className="block mb-1">Discount Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed amount ($)</option>
                </select>
            </div>

            <div>
                <label className="block mb-1">Value</label>
                <input
                    type="number"
                    value={value}
                    required
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder={type === 'percentage' ? "10 (%)" : "2 ($)"}
                />
            </div>

            <div>
                <label className="block mb-1">Minimum Order (optional)</label>
                <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="5"
                />
            </div>

            <button type="submit" className="px-4 py-2 bg-black text-white hover:bg-gray-800">
                Add Coupon
            </button>
        </form>
    );
};

export default AddCoupon;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateCoupon({ token }) {
    const { id } = useParams();

    const [code, setCode] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [minOrder, setMinOrder] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        if (!token) return;

        axios.get(`http://localhost:4000/api/coupon/update/${id}/edit`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const { code, type, value, minOrder, startDate, endDate } = res.data;
            setCode(code);
            setType(type);
            setValue(value);
            setMinOrder(minOrder);
            setStartDate(startDate?.substring(0, 10)); // yyyy-mm-dd
            setEndDate(endDate?.substring(0, 10));
        }).catch(err => console.error(err));
    }, [id, token]);

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        const data = { code, type, value, minOrder, startDate, endDate };

        axios.put(`http://localhost:4000/api/coupon/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            //
            toast.success('Success Update Coupon!');
        }).catch(err =>
            toast.err(err)
        );
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Update Coupon Code</h1>

            <form onSubmit={handleSubmitUpdate} className="flex flex-col gap-4">
                {/* Code */}
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Coupon code"
                    className="border px-3 py-2 rounded"
                />

                {/* Type */}
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">Type of promote</option>
                    <option value="percentage"> Percentage (%)</option>
                    <option value="fixed"> Discount ($)</option>
                </select>

                {/* Value */}
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Decrease value"
                    className="border px-3 py-2 rounded"
                />

                {/* Min Order */}
                <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    placeholder="Min order"
                    className="border px-3 py-2 rounded"
                />

                {/* Start Date */}
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border px-3 py-2 rounded"
                />

                {/* End Date */}
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border px-3 py-2 rounded"
                />

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                    <Link to="/admin-coupon">
                        <button type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
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

export default UpdateCoupon;

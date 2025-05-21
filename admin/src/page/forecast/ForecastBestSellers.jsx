import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../App';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function ForecastBestSellers() {
    const [forecasts, setForecasts] = useState([]);

    useEffect(() => {
        axios.get(`${backendUrl}/api/forecast/bestsellers`)
            .then(res => setForecasts(res.data.data))
            .catch(err => console.error('Lỗi khi lấy dự báo:', err));
    }, []);

    return (
        <div className="bg-white rounded-xl p-5 shadow-md max-w-3xl mx-auto ">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Forecast of best-selling products next week
            </h2>
            <h6 className='text-center'>Based on product orders from 2 weeks ago</h6>

            {forecasts.length === 0 ? (
                <p className="text-center text-gray-500">No data forecast.</p>
            ) : (
                <>
                    <ul className="space-y-3 mb-6">
                        {forecasts.map((item, index) => (
                            <li
                                key={item.productId}
                                className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center"
                            >
                                <span className="font-medium text-gray-700">
                                    Top {index + 1}: <span className="text-indigo-600 font-semibold">{item.productName}</span>
                                </span>
                                <span className="text-green-600 font-bold">
                                    {item.predictedQuantity} quantity
                                </span>
                            </li>
                        ))}

                    </ul>

                    {/* Optional: Bar Chart */}
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={forecasts}>
                            <XAxis dataKey="productName" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="predictedQuantity" fill="#4F46E5" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
}

export default ForecastBestSellers;

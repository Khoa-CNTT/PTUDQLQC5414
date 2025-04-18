import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl,currency } from '../App';
import { assets } from '../assets/assets';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');

    const fetchUserOrders = async () => {
        if (!token) return;

        try {
            const response = await axios.post(
                backendUrl + '/api/order/list-personal',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserOrders();
    }, []);

    return (
        <div className='pb-10'>
            <h3 className="text-2xl mb-6 text-white">Your Orders</h3>
            <div>
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 rounded-2xl bg-white shadow-sm p-5 mb-4 text-sm text-gray-700"
                    >
                        <img className="w-12 h-12" src={assets.order_img} alt="order" />
                        <div>
                            {order.items.map((item, idx) => (
                                <p key={idx}>
                                    <span className="font-medium">{item.name}</span> x {item.quantity}{' '}
                                    <span className="italic text-gray-500">({item.size})</span>
                                </p>
                            ))}
                            <p className="mt-3 font-semibold text-gray-900">
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <p className="text-xs text-gray-600">{order.address.phone}</p>
                        </div>
                        <div>
                            <p className="font-medium">Items: {order.items.length}</p>
                            <p>Method: {order.paymentMethod}</p>
                            <p>
                                Payment:{' '}
                                <span
                                    className={
                                        order.payment ? 'text-green-600 font-medium' : 'text-red-500 font-medium'
                                    }
                                >
                                    {order.payment ? 'Done' : 'Pending'}
                                </span>
                            </p>
                            <p>📅 {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <p className="font-bold text-indigo-600 text-right">
                            {currency}{order.amount}
                        </p>
                        <p className="font-medium text-gray-800">Status: {order.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;
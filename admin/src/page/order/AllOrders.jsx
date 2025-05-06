import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../../App';
import { assets } from '../../assets_admin/assets';
import { toast } from 'react-toastify';

const AllOrders = ({ token }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        if (!token) return;

        try {
            const response = await axios.post(backendUrl + '/api/order/list', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
            );
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                //
            }
        } catch (error) {
            //
        }
    };

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/order/status',
                { orderId, status: event.target.value },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.success) {
                await fetchAllOrders();
                //
                toast.success('Success Update Status!');
            }
        } catch (error) {
            error.log(error);
            //
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [token]);

    return (
        <div className="">
            <h3 className="text-lg mb-4 text-gray-800">All Orders</h3>
            <div>
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 rounded-2xl bg-white shadow-sm p-5 mb-4 text-sm text-gray-700 transition duration-200 hover:shadow-md"
                    >
                        {/* Icon */}
                        <img
                            className="w-12 h-12 object-contain"
                            src={assets.order_img}
                            alt=""
                        />

                        {/* Product Info */}
                        <div>
                            <div>
                                {order.items.map((item, idx) => (
                                    <p className="py-0.5" key={idx}>
                                        <span className="font-medium">{item.name}</span> x {item.quantity}{' '}
                                        <span className="italic text-gray-500">({item.size})</span>
                                    </p>
                                ))}
                            </div>
                            <p className="mt-3 font-semibold text-gray-900">
                                {order.address.firstName + ' ' + order.address.lastName}
                            </p>
                            <div className="text-gray-600 text-xs mt-1 space-y-0.5">
                                <p>{order.address.street},</p>
                                <p>
                                    {order.address.city}, {order.address.state}, {order.address.country},{' '}
                                    {order.address.zipcode}
                                </p>
                            </div>
                            <p className="mt-1 text-gray-600 text-xs">{order.address.phone}</p>
                        </div>

                        {/* Order Info */}
                        <div className="space-y-1 text-gray-700">
                            <p className="font-medium">Items: {order.items.length}</p>
                            <p>Method: {order.paymentMethod}</p>
                            <p>
                                Payment:{' '}
                                <span
                                    className={
                                        order.payment ? 'text-green-600 font-medium' : 'text-red-500 font-medium'
                                    }
                                >
                                    {order.payment ? 'Done' : 'Loading'}
                                </span>
                            </p>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        </div>

                        {/* Total */}
                        <p className="font-bold text-base text-right text-indigo-600">
                            {currency}
                            {order.amount}
                        </p>

                        {/* Status Dropdown */}
                        <select
                            onChange={(event) => statusHandler(event, order._id)}
                            value={order.status}
                            className="p-2 border border-gray-300 rounded-md font-medium bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
                        >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrders;

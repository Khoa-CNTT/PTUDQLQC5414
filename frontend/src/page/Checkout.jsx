import React, { useContext, useState, useEffect } from 'react';
import CartTotal from '../components/CartTotal';
import Label from '../components/Label';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Checkout = () => {
    const [method, setMethod] = useState('cod');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        discount,
        setDiscount,
        coupon,
        setCoupon,
        products
    } = useContext(ShopContext);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandle = async (event) => {
        event.preventDefault();
        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(
                            products.find((product) => product._id === items)
                        );
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee - discount,
                discount: discount,
                coupon: coupon
            };

            switch (method) {
                case 'cod':
                    const response = await axios.post(
                        backendUrl + '/api/order/checkout',
                        orderData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (response.data.success) {
                        setCoupon(response.data.coupon);
                        navigate('/orders');
                        setCartItems({});
                        alert('Đặt hàng thành công');
                    } else {
                        alert('Có lỗi xảy ra trong quá trình tạo đơn hàng.');
                    }
                    break;

                case 'paypal':
                    try {
                        const responsePaypal = await axios.post(
                            backendUrl + '/api/order/paypal',
                            orderData,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );

                        console.log('RESPONSE PAYPAL:', responsePaypal.data);

                        if (responsePaypal.data.success) {
                            const { approvalUrl } = responsePaypal.data;
                            if (approvalUrl) {
                                window.location.href = approvalUrl;
                            } else {
                                alert('Không có approvalUrl từ server.');
                            }
                        } else {
                            alert('Tạo đơn hàng PayPal thất bại.');
                        }
                    } catch (err) {
                        console.error('Lỗi khi gọi API PayPal:', err);
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandle}
            className="flex flex-col sm:flex-row justify-between gap-4 pt-5 py-8 min-h-[80vh] border-t"
        >
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Label text1="DELIVERY" text2="INFORMATION" />
                </div>

                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="firstName"
                        value={formData.firstName}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="lastName"
                        value={formData.lastName}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Last name"
                    />
                </div>

                <input
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Street"
                />

                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="city"
                        value={formData.city}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="City"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="state"
                        value={formData.state}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="State"
                    />
                </div>

                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="zipcode"
                        value={formData.zipcode}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="number"
                        placeholder="Zip code"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="country"
                        value={formData.country}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Country"
                    />
                </div>

                <input
                    required
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="number"
                    placeholder="Phone"
                />
            </div>

            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>

                <div className="mt-12">
                    <Label text1="PAYMENT" text2="METHOD" />

                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div
                            onClick={() => setMethod('paypal')}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-green-400' : ''
                                    }`}
                            >
                                __
                            </p>
                            <img src={assets.paypal_logo} alt="" className="h-6 w-[80%]" />
                        </div>

                        <div
                            onClick={() => setMethod('cod')}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''
                                    }`}
                            >
                                __
                            </p>
                            <p className="text-white text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Checkout;

import React, { useContext, useState, useEffect } from 'react';
import Label from './Label';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const CartTotal = () => {
    const {
        currency,
        delivery_fee,
        getCartAmount,
        backendUrl,
        token,
        discount,
        setDiscount,
        coupon,
        setCoupon
    } = useContext(ShopContext);

    const [couponCode, setCouponCode] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // TU DONG RESET DISCOUNT VE 0 KHI DA MUA XONG
        setDiscount('')
    }, []);

    const subtotal = getCartAmount();
    const finalTotal = subtotal > 0
        ? subtotal + delivery_fee - discount
        : 0;

    const handleApplyCoupon = async () => {
        try {
            const res = await axios.post(
                `${backendUrl}/api/coupon/apply`,
                {
                    code: couponCode.trim(),
                    orderTotal: subtotal
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const discountValue = Math.floor(res.data.discount);
            setDiscount(discountValue);
            setCoupon({
                applied: true,
                code: couponCode.trim(),
                discount: discountValue
            });

            setMessage(`Apply success, discount ${currency}${discountValue.toFixed(2)}`);
        } catch (err) {
            setDiscount(0);
            setCoupon({ applied: false });
            setMessage(err.response?.data?.error || 'Code not valid');
        }
    };

    return (
        <div className="w-full">
            <div className="text-2xl">
                <Label text1="CART" text2="TOTALS" />
            </div>

            <div className="flex flex-col gap-2 mt-2 text-sm text-white">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{subtotal.toFixed(2)}</p>
                </div>

                <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>{currency}{delivery_fee.toFixed(2)}</p>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                        <p>Discount</p>
                        <p>-{currency}{discount.toFixed(2)}</p>
                    </div>
                )}

                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency}{finalTotal.toFixed(2)}</b>
                </div>

                <div className="mt-4">
                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Fill the promote code"
                        className="w-full px-3 py-2 rounded text-black"
                    />
                    <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-blue-500 mt-2 px-4 py-2 rounded text-white w-full"
                    >
                        Apply code
                    </button>
                    {message && (
                        <p className={`mt-1 text-xs ${discount > 0 ? 'text-green-300' : 'text-red-400'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartTotal;

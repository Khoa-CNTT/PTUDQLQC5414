import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async (req, res) => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl
                + '/api/order/verifypaypal', { success, orderId }, { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                setCartItems({})
                //
                navigate('/orders')
                toast.success('Success Order!');
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            //
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>

        </div>
    )
}

export default Verify
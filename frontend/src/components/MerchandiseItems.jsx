import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

// hiển thị sản phẩm áp dụng trong latestcompilation và bestchoice
const MerchandiseItems = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext)

    return (
        <div className=''>
            <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
                <div className='overflow-hidden rounded-t-lg'>
                    <img src={image[0]} alt='' className='hover:scale-110 transition ease-in-out h-36 w-full object-cover' />
                </div>
                <div className='px-3 py-2 bg-orange-100 rounded-b-lg'>
                    <p className='text-black'>{name}</p>
                    <h1 className='text-base font-medium text-red-500 rounded-sm'>{currency} {price}</h1>
                </div>
            </Link>
        </div>
    )
}

export default MerchandiseItems
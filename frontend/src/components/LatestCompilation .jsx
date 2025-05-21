import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Label from './Label';
import MerchandiseItems from './MerchandiseItems';

const LatestCompilation = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 5));
    }, [products])

    return (
        <div className='mt-28'>
            <div className='text-center py-8 text-3xl'>
                <Label text1={'LATEST'} text2={'COMPILATION'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-white'>
                    Welcome to our coffee shop, where every sip brings warmth and relaxation. Discover our diverse menu and treat yourself to your favorite brew today!
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item, index) => (
                        <MerchandiseItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCompilation
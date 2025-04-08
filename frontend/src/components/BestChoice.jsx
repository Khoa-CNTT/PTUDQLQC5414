import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import MerchandiseItems from './MerchandiseItems.jsx';
import Label from './Label.jsx';

//các món đồ best seller
const BestChoice = () => {
    const { products } = useContext(ShopContext);
    const [BestChoice, setBestChoice] = useState([]);

    useEffect(() => {
        const filtered = products.filter(product => product.bestseller === true);
        setBestChoice(filtered.slice(0, 5)); // Chỉ lấy tối đa 5 món
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center pt-8 text-3xl'>
                <Label text1={'BEST'} text2={'COMPILATION'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-white'>
                    A curated selection of the finest coffee experiences, blending rich flavors, cozy vibes, and the art of brewing. Discover the best in every cup
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {BestChoice.map((item, index) => (
                    <MerchandiseItems
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default BestChoice;

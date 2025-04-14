import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Label from './Label';
import MerchandiseItems from './MerchandiseItems';

const RelatedProducts = ({ category, subCategory }) => {
    // Lấy danh sách sản phẩm từ context
    const { products } = useContext(ShopContext);

    // State để lưu danh sách sản phẩm liên quan
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            // Tạo một bản sao của danh sách sản phẩm
            let productsCopy = products.slice();

            // Lọc sản phẩm theo danh mục chính (category)
            productsCopy = productsCopy.filter((item) => category === item.category);

            // Lọc tiếp theo danh mục phụ (subCategory)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            // Chỉ lấy tối đa 5 sản phẩm liên quan
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory]); // Chạy lại khi dữ liệu sản phẩm hoặc danh mục thay đổi

    return (
        <div className='mt-24 pb-10'>
            {/* Tiêu đề "RELATED PRODUCTS" */}
            <div className='text-center text-3xl py-2'>
                <Label text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            {/* Hiển thị danh sách sản phẩm liên quan */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <MerchandiseItems
                        key={index}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;

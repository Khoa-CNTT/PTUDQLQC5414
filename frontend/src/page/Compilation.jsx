import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import MerchandiseItems from '../components/MerchandiseItems';
import Label from '../components/Label';

const Compilation = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFillerProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) =>
                prev.filter((item) => item !== e.target.value)
            );
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }
    };
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) =>
                prev.filter((item) => item !== e.target.value)
            );
        } else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    };

    const applyFilter = React.useCallback(() => {
        let productsCopy = products.slice();
        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                category.includes(item.category)
            );
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                subCategory.includes(item.subCategory)
            );
        }
        setFillerProducts(productsCopy);
    }, [products, showSearch, search, category, subCategory]);

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFillerProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;

            case 'high-low':
                setFillerProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;

            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products, applyFilter]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='min-w-60 text-white'>
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className='my-2 text-xl flex items-center cursor-pointer gap-2'
                >
                    FILTERS
                    <img
                        className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''
                            }`}
                        src={assets.dropdown_icon}
                        alt=''
                    />
                </p>

                <div
                    className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'
                        } sm:block`}
                >
                    <p className='mb-3 text-sm font-medium text-white'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-white'>
                        <p className='flex gap-2'>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'black'}
                                onChange={toggleCategory}
                            />{' '}
                            Black coffee
                        </p>
                        <p className='flex gap-2 '>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'milk'}
                                onChange={toggleCategory}
                            />{' '}
                            Milk coffee
                        </p>
                        <p className='flex gap-2 '>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'egg'}
                                onChange={toggleCategory}
                            />{' '}
                            Egg coffee
                        </p>
                        <p className='flex gap-2 '>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'coconut'}
                                onChange={toggleCategory}
                            />{' '}
                            Coconut coffee
                        </p>
                        <p className='flex gap-2 '>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'salt'}
                                onChange={toggleCategory}
                            />{' '}
                            Salt coffee
                        </p>
                        <p className='flex gap-2 '>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'cappuccino'}
                                onChange={toggleCategory}
                            />{' '}
                            Cappuccino
                        </p>
                    </div>
                </div>

                <div
                    className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'
                        } sm:block`}
                >
                    <p className='mb-3 text-sm font-medium text-white'>TYPE </p>
                    <div className='flex flex-col gap-2 text-sm font-light text-white'>
                        <p className='flex gap-2 '>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'hot'}
                                onChange={toggleSubCategory}
                            />
                            Hot
                        </p>
                        <p className='flex gap-2 '>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'cold'}
                                onChange={toggleSubCategory}
                            />
                            Cold
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Label text1={'ALL'} text2={'COMPILATIONS'} />
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className='border-2 border-gray-300 text-sm px-2 rounded-[15px]'
                    >
                        <option value='relavent'>Sort by: Relavent</option>
                        <option value='low-high'>Sort by: Low to High</option>
                        <option value='high-low'>Sort by: High to Low</option>
                    </select>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
                    {filterProducts.map((item, index) => (
                        <MerchandiseItems
                            key={index}
                            name={item.name}
                            id={item._id}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Compilation;

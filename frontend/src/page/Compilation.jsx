import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import MerchandiseItems from '../components/MerchandiseItems';
import Label from '../components/Label';

const Compilation = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/category/list');
                if (response.data.success) {
                    setCategories(response.data.categories);
                }
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);

    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const applyFilter = () => {
        let filtered = [...products];

        // Tìm theo tên nếu có search
        if (showSearch && search) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Lọc theo category chính
        if (category.length > 0) {
            filtered = filtered.filter((item) =>
                category.includes(item.category)
            );
        }

        // Lọc theo subCategories (chú ý sửa field thành subCategories)
        if (subCategory.length > 0) {
            filtered = filtered.filter((item) => {
                const sc = item.subCategories;
                if (!sc || !Array.isArray(sc)) return false;
                return sc.some((s) => subCategory.includes(s));
            });
        }

        setFilterProducts(filtered);
    };

    const sortProduct = () => {
        let fpCopy = [...filterProducts];
        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;
            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t pb-28 '>
            <div className='min-w-60 text-white'>
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className='my-2 text-xl flex items-center cursor-pointer gap-2'
                >
                    FILTERS
                    <img
                        className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
                        src={assets.dropdown_icon}
                        alt='dropdown icon'
                    />
                </p>

                {/* CATEGORY FILTER */}
                <div className={`border border-gray-300 px-3 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium text-white'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-white'>
                        {categories.map((cat, index) => (
                            <label className='flex gap-2' key={index}>
                                <input
                                    className='w-3'
                                    type='checkbox'
                                    value={cat.name}
                                    onChange={toggleCategory}
                                    checked={category.includes(cat.name)}
                                />
                                {cat.name}
                            </label>
                        ))}
                    </div>
                </div>

                {/* SUBCATEGORY FILTER */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium text-white'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-white'>
                        {categories
                            .filter((cat) => category.includes(cat.name))
                            .flatMap((cat) => cat.subCategories)
                            .map((sub, index) => (
                                <label className='flex gap-2' key={index}>
                                    <input
                                        className='w-3'
                                        type='checkbox'
                                        value={sub}
                                        onChange={toggleSubCategory}
                                        checked={subCategory.includes(sub)}
                                    />
                                    {sub}
                                </label>
                            ))}
                    </div>
                </div>
            </div>

            {/* PRODUCT LIST */}
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

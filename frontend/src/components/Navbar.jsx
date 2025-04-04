import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

//thanh trên cùng bao gồm các navlink chuyển trang ,...
const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const {
        setShowSearch,
        getCartCount,
        navigate,
        token,
        logout,
        name,
        setName,
        setCartItems
    } = useContext(ShopContext);

    //
    useEffect(() => {
        const token = localStorage.getItem('token')
        const storedName = localStorage.getItem('name');
        if (token && storedName) {
            setName(storedName);
        } else {
            //
        }
    }, []);

    //
    const logoutevent = () => {
        //logout remove Token
        logout()
        setCartItems({});
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link className='flex items-center' to='/'>
                <FontAwesomeIcon className='text-3xl pr-2 text-white' icon={faMugHot} />
                <p className='w-36 text-xl text-white'>5VIBES
                </p>
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p className='text-white'>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink
                    to='/compilation'
                    className='flex flex-col items-center gap-1'
                >
                    <p className='text-white'>COMPILATION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink
                    to='/about'
                    className='flex flex-col items-center gap-1'
                >
                    <p className='text-white'>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink
                    to='/contact'
                    className='flex flex-col items-center gap-1'
                >
                    <p className='text-white'>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img
                    onClick={() => setShowSearch(true)}
                    src={assets.search_icon}
                    alt=''
                    className='w-5 cursor-pointer'
                    style={{ filter: 'invert(1)' }} //chỉnh lại màu sắc cho img cho trường hợp ko dùng text-white cho font-awesome
                />

                <div className='group relative'>
                    <div className='flex items-center'>
                        <img
                            onClick={() => (token ? null : navigate('/login'))}
                            src={token ? assets.logo_person : assets.profile_icon} // Sửa src dựa trên điều kiện token
                            className={`w-5 cursor-pointer ${token ? 'w-8 rounded-full' : ''}`}
                            style={{ filter: 'invert(1)' }} // Chỉnh lại màu sắc cho img khi không dùng text-white cho font-awesome
                        />
                        {token ? <p className='text-gray-400 pl-1'>{name}</p> : ''}
                    </div>


                    {/* Dropdown menu chỉ hiển thị khi có token */}
                    {token && (
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-1 z-10'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p
                                    onClick={() => navigate('/profile')}
                                    className='cursor-pointer hover:text-black'>
                                    My Profile
                                </p>
                                <p
                                    onClick={() => navigate('/orders')}
                                    className='cursor-pointer hover:text-black'>
                                    Orders
                                </p>
                                <p
                                    onClick={logoutevent}
                                    className='cursor-pointer hover:text-black'>
                                    Logout
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <Link to='/cart' className='relative'>
                    <img
                        src={assets.cart_icon}
                        alt=''
                        className='w-5 min-w-5'
                        style={{ filter: 'invert(1)' }} //chỉnh lại màu sắc cho img cho trường hợp ko dùng text-white cho font-awesome
                    />
                    <p className='absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    alt=''
                    className='w-5 cursor-pointer sm:hidden'
                    style={{ filter: 'invert(1)' }}
                />
            </div>

            <div
                className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white z-10 translate-all ${visible ? 'w-full' : 'w-0'
                    }`}
            >
                <div className='flex flex-col text-gray-600'>
                    <div
                        onClick={() => setVisible(false)}
                        className='flex items-center gap-4 p-3 cursor-pointer'
                    >
                        <img
                            src={assets.dropdown_icon}
                            alt=''
                            className='h-4 rotate-180'
                            style={{ filter: 'invert(1)' }}
                        />
                        <p>Back</p>
                    </div>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border'
                        to='/'
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border'
                        to='/COMPILATION'
                    >
                        COMPILATION
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border'
                        to='/about'
                    >
                        ABOUT
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border'
                        to='/contact'
                    >
                        CONTACT
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavBar;

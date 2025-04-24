import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets_admin/assets'

const navItemStyle = "flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-l transition-all hover:bg-gray-100 hover:shadow-md";
const activeStyle = "bg-blue-300 font-semibold";

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r bg-white'>
            <div className='flex flex-col gap-5 py-6 px-6 text-[15px]'>

                <NavLink to="/admin-revenue" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.revenue_img} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Revenue</p>
                </NavLink>

                <hr className='border-gray-300' />

                <NavLink to="/admin-add-account" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.add_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Add Account</p>
                </NavLink>

                <NavLink to="/admin-account" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.list_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Account List</p>
                </NavLink>

                <hr className='border-gray-300' />

                <NavLink to="/admin-add" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.add_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>

                <NavLink to="/admin-list" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.list_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Items List</p>
                </NavLink>

                <hr className='border-gray-300' />

                <NavLink to="/admin-add-category" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.add_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Add Category</p>
                </NavLink>

                <NavLink to="/admin-category" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.list_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Category List</p>
                </NavLink>

                <hr className='border-gray-300' />

                <NavLink to="/admin-order" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.list_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Order List</p>
                </NavLink>

                <hr className='border-gray-300' />

                <NavLink to="/admin-review" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.list_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Review List</p>
                </NavLink>

                <hr className='border-gray-300' />

                <NavLink to="/admin-add-coupon" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.add_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Add Coupon</p>
                </NavLink>

                <NavLink to="/admin-coupon" className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : ''}`}>
                    <img src={assets.list_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Coupon List</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar;

import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets_admin/assets'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

                <NavLink to="/admin-add" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                    <img src={assets.add_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>
                <NavLink to="/admin-list" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                    <img src={assets.list_icon} alt='' className='w-5 h-5' />
                    <p className='hidden md:block'>All List Items</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
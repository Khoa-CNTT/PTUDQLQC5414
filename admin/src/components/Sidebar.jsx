import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets_admin/assets'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

                <div>
                    <NavLink to="/admin-add" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 mb-2 rounded-l'>
                        <img src={assets.add_icon} alt='' className='w-5 h-5' />
                        <p className='hidden md:block'>Add Items</p>
                    </NavLink>

                    <NavLink to="/admin-list" className='flex items-center gap-3 border border-gray-300border-r-0 px-3 py-2 rounded-l'>
                        <img src={assets.list_icon} alt='' className='w-5 h-5' />
                        <p className='hidden md:block'>List Items</p>
                    </NavLink>
                </div>

                <span className=' border border-b-red-400 '></span>

                <div>
                    <NavLink to="/admin-add-category" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 mb-2 rounded-l'>
                        <img src={assets.list_icon} alt='' className='w-5 h-5' />
                        <p className='hidden md:block'>Add Category</p>
                    </NavLink>

                    <NavLink to="/admin-category" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                        <img src={assets.list_icon} alt='' className='w-5 h-5' />
                        <p className='hidden md:block'>List Category</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
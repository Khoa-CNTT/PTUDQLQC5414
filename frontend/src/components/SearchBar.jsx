import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

    return showSearch ? (
        <div className='border-t border-b bg-auto text-center'>
            <div className='inline-flex items-center justify-center border border-white px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm text-white placeholder-white' type="text" placeholder='Search' />
                <img src={assets.search_icon} alt='' className='w-4' style={{ filter: 'invert(1)' }} />
            </div>
            <img src={assets.cross_icon} alt='' className='inline w-5 cursor-pointer' style={{ filter: 'invert(1)' }} onClick={() => setShowSearch(false)} />
        </div>
    ) : null
}

export default SearchBar
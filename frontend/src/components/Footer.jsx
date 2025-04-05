import React from 'react'

//Chân trang chứa contact để liên hệ,...
const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:flex-row grid:cols-[3fr_1fr_1fr] gap-14 mt-8 text-sm'>
                <div>
                    <h1 className='mb-5 w-32 text-2xl'>5VIBES</h1>
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Welcome to [5VIBES] – where every cup tells a story. Indulge in the finest coffee, crafted from handpicked beans, and experience exceptional service in a cozy atmosphere. Discover a rich menu designed for true coffee lovers!</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY </p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>HOME</li>
                        <li>COMPILATION</li>
                        <li>ABOUT</li>
                        <li>CONTACT</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>CONTACT</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+84-002331231</li>
                        <li>leminh@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ 5vibes.com</p>
            </div>

        </div>
    )
}

export default Footer
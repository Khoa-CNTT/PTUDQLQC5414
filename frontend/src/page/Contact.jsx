import React from 'react'
import { assets } from '../assets/assets'
import Label from '../components/Label'
import { Link } from 'react-router-dom'

const Contact = () => {
    return (
        <div className='text-white'>
            <div className='text-center text-2xl pt-10 border-t'>
                <Label text1={'CONTACT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 pb-16'>
                <img src={assets.contact_us} alt='' className='w-full md:max-w-[480px]' />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl'>Our Store</p>
                    <p>212 Xo Viet Nghe Tinh Street<br />21 Dong Ke, Vietnam</p>
                    <p>Tel: (+84) 2728-231211<br />Email: 5vibes@gmail.com</p>

                    <p className='font-semibold text-xl'>Careers at 5VIBES</p>
                    <p>Interested in joining our vibrant and passionate team? Learn more about our culture and current openings.</p>
                    <Link to={'/'}>
                        <button className='border border-black px-8 py-4 text-sm rounded-lg bg-black hover:bg-orange-200 hover:text-black transition-all duration-500'>Explore Shop</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Contact

import React from 'react'
import { assets } from '../assets/assets'
import Label from '../components/Label'

const About = () => {
    return (
        <div className='pb-16'>
            <div className='text-2xl text-center pt-8 border-t'>
                <Label text1={'ABOUT'} text2={'US'} />
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16 text-white'>
                <img src={assets.about} alt='' className='w-full md:max-w-[450px]' />
                <div className='flex flex-col justify-center gap-6 md:w-2/4'>
                    <p>5VIBES was created from a passion for creativity and a desire to deliver unique coffee experiences. Our journey began with a simple idea: to build a space where customers can enjoy high-quality coffee in a relaxing and cozy atmosphere.</p>
                    <p>Since our establishment, we have continuously expanded our product range – from hand-roasted coffee beans to signature beverages – to offer a complete and satisfying experience to every customer. At 5VIBES, we take pride in providing premium coffee options combined with an inviting, friendly space full of inspiration.</p>
                    <b>Our Mission</b>
                    <p>Our mission at 5VIBES is to bring customers exceptional and inspiring coffee experiences. We are committed to delivering attentive service – from the moment you step into the shop to the moment you enjoy your favorite drink – making every visit a memorable one.</p>
                </div>
            </div>


            <div className='text-xl py-4'>
                <Label text1={'WHY'} text2={'CHOOSE US'} />
            </div>
            <div className='flex flex-col md:flex-row text-sm text-white'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b className='text-xl'>Quality Assurance:</b>
                    <p >We carefully select and evaluate every ingredient and product to ensure it meets the highest standards of quality.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b className=' text-xl'>Convenience & Accessibility:</b>
                    <p>Customers can easily place orders, make payments online with just a few simple steps.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b className='text-xl'>Exceptional Customer Service:</b>
                    <p>Our friendly and professional team is always ready to listen and serve you with care and dedication.</p>
                </div>
            </div>
        </div>
    )
}

export default About

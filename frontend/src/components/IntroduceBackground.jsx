import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// giới thiệu về ảnh background và quán coffee
const IntroduceBackground = () => {
    const [image, setImage] = useState(assets.back_coffe3);
    const [fade, setFade] = useState(false); // Trạng thái để điều khiển hiệu ứng fade

    const handleClick = () => {
        setFade(true); // Bắt đầu hiệu ứng fade
        setTimeout(() => {
            setImage(prevImage => prevImage === assets.back_coffe3 ? assets.back_coffe4 : assets.back_coffe3);
            setFade(false); // Kết thúc hiệu ứng fade
        }, 200); // Thời gian để thực hiện fade-out trước khi thay đổi ảnh
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true); // Bắt đầu hiệu ứng fade
            setTimeout(() => {
                setImage(prevImage => prevImage === assets.back_coffe3 ? assets.back_coffe4 : assets.back_coffe3);
                setFade(false); // Kết thúc hiệu ứng fade
            }, 200); // Thời gian fade-out trước khi thay ảnh
        }, 4500); // Mỗi 4 giây thay đổi ảnh

        // Dọn interval khi component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col sm:flex-row border max-h-96 border-gray-400 relative'>
            <div className='w-full sm:w-1/3 flex items-center justify-center py-10 sm:py-0 bg-orange-100'>
                <div className='text-[#414141] pl-10'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>Tasty down to the last drop</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>QUALITY COFFEE</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>ORDER NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>

            {/* Áp dụng hiệu ứng fade */}
            <img
                className={`w-full sm:w-2/3 relative transition-all duration-500 ease-in-out transform ${fade ? 'opacity-0' : 'opacity-100'}`}
                src={image}
                alt=''
            />

            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent text-white text-3xl"
                onClick={handleClick}
            >
                <FontAwesomeIcon className='text-3xl absolute right-4 text-gray-300' icon={faChevronRight} />
            </button>
        </div>
    );
};

export default IntroduceBackground;

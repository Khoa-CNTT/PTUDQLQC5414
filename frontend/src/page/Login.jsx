import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';



const Login = () => {
    const [currentState, setCurrentState] = useState('Dang Ky');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (currentState === 'Dang Ky') {
            axios
                .post(`${backendUrl}/api/user/dang-ky`, { name, email, password })
                .then((response) => {
                    if (response.data.success) {
                        toast.success("Đăng ký thành công!");
                        setCurrentState('Dang Nhap');
                    } else {
                        toast.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error(error.message || 'Có lỗi xảy ra!');
                });
        } else {
            axios
                .post(`${backendUrl}/api/user/dang-nhap`, { email, password })
                .then((response) => {
                    if (response.data.success) {
                        setToken(response.data.token);
                        localStorage.setItem('token', response.data.token);
                        navigate('/');
                    } else {
                        toast.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error(error.message || 'Có lỗi xảy ra!');
                });
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
        >
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>

            {currentState === 'Dang Ky' && (
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type='text'
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Tên'
                    required
                />
            )}

            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Email'
                required
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Mật khẩu'
                required
            />

            <div className='w-full flex justify-between text-sm mt-[8px]'>
                <p className='cursor-pointer'>Quên mật khẩu?</p>
                <p
                    onClick={() => setCurrentState(currentState === 'Dang Nhap' ? 'Dang Ky' : 'Dang Nhap')}
                    className='cursor-pointer'
                >
                    {currentState === 'Dang Nhap' ? 'Tạo tài khoản' : 'Đăng nhập tại đây'}
                </p>
            </div>

            <button className='bg-black text-white font-light px-8 py-2 mt-4 w-full h-[50px]'>
                {currentState === 'Dang Ky' ? 'Đăng Ký' : 'Xác Nhận'}
            </button>
        </form>
    );
};

export default Login;


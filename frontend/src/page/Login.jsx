import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const { login, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let url = backendUrl + '/api/user/';
        let data = { email, password };

        if (currentState === 'Sign Up') {
            url += 'register';
            data.name = name;
        } else if (currentState === 'Forgot Password') {
            url += 'forgot-password';
            data.email = email;
        } else {
            url += 'login';
        }

        axios.post(url, data)
            .then(response => {
                if (response.data.success) {
                    if (currentState === 'Login') {
                        //setToken khi login
                        toast.success('Success Login!');
                        login(response.data.token, response.data.name);

                        //
                    } else if (currentState === 'Forgot Password') {
                        setMessage("A reset link has been sent to your email.");
                        setCurrentState('Login');
                    }
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message || 'An error occurred');
            });
    };

    return (
        <div className='flex justify-center pb-16'>
            <form
                onSubmit={onSubmitHandler}
                className='flex flex-col items-center w-[60%] sm:max-w-96 gap-4 text-white'
            >
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <p className='prata-regular text-3xl'>{currentState}</p>
                    <hr className='border-none h-[1.5px] w-8 bg-white' />
                </div>

                {currentState === 'Forgot Password' ? (
                    <div>
                        <p className="mb-4">Enter your email address to reset your password.</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            className="w-full px-3 py-2 border border-gray-800 text-black"
                            placeholder="Email"
                            required
                        />
                    </div>
                ) : currentState === 'Sign Up' ? (
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-800 text-black"
                        placeholder="Name"
                        required
                    />
                ) : null}

                {currentState !== 'Forgot Password' && (
                    <>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            className="w-full px-3 py-2 border border-gray-800 text-black"
                            placeholder="Email"
                            required
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            className="w-full px-3 py-2 border border-gray-800 text-black"
                            placeholder="Password"
                            required
                        />
                    </>
                )}

                {message && <p className="text-green-500 mt-4">{message}</p>}

                <div className="w-full flex justify-between text-sm mt-[8px]">
                    {currentState === 'Login' ? (
                        <p
                            onClick={() => setCurrentState('Forgot Password')}
                            className="cursor-pointer"
                        >
                            Forgot your password?
                        </p>
                    ) : (
                        <p
                            onClick={() => setCurrentState('Login')}
                            className="cursor-pointer"
                        >
                            Back to Login
                        </p>
                    )}

                    {currentState === 'Login' ? (
                        <p
                            onClick={() => setCurrentState('Sign Up')}
                            className="cursor-pointer"
                        >
                            Create account
                        </p>
                    ) : (
                        <p
                            onClick={() => setCurrentState('Login')}
                            className="cursor-pointer"
                        >
                            Login Here
                        </p>
                    )}
                </div>

                <button className="bg-black text-white font-light px-8 py-2 mt-4 w-full h-[50px] hover:bg-slate-700">
                    {currentState === 'Login' ? 'Sign In' : currentState === 'Sign Up' ? 'Sign Up' : 'Send Reset Link'}
                </button>
            </form>
        </div>
    );
};

export default Login;

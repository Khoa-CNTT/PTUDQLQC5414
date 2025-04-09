import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { assets } from '../assets/assets';

function Profile() {
    const [name, setName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const { token, backendUrl } = useContext(ShopContext);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            console.error('User is not logged in!');
        } else {
            fetchData(token);
        }
    }, [])

    // Hàm
    const fetchData = (token) => {
        axios.get(`${backendUrl}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                const { name, phonenumber, address, city, country } = response.data;
                setName(name || '');
                setPhonenumber(phonenumber || '');
                setAddress(address || '');
                setCity(city || '');
                setCountry(country || '');
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    };

    //ham Update
    const handleUpdate = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const updatedData = {
            name,
            phonenumber,
            address,
            city,
            country,
        };

        axios.put(`${backendUrl}/api/user/profile`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                const { name, phonenumber, address, city, country } = response.data;
                setName(name || '');
                setPhonenumber(phonenumber || '');
                setAddress(address || '');
                setCity(city || '');
                setCountry(country || '');
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row w-full bg-gray-200 shadow-lg rounded-lg p-6 gap-6">
                <div className="flex flex-col items-center md:w-1/3">
                    <img
                        src={token ? assets.logo_person : ''}
                        alt=""
                        className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
                    />
                    <p className="mt-2 text-blue-500 cursor-pointer hover:underline">AVATAR</p>
                </div>
                <form className="flex flex-col gap-4 md:w-2/3" onSubmit={handleUpdate}>
                    <p className="text-lg font-semibold">PROFILE INFORMATION</p>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength="600"
                            className="px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Phone Number:</label>
                        <input
                            type="text"
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                            maxLength="255"
                            className="px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Address:</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                        ></textarea>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">City:</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Country:</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            className="px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;

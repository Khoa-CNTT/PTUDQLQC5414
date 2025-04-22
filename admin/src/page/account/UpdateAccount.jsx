import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../../../frontend/src/context/ShopContext';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function UpdateAccount({ token }) {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState([]);
    const [country, setCountry] = useState([]);

    useEffect(() => {
        if (!token) return;

        // Fetch thông tin sản phẩm cần cập nhật
        axios.get(`http://localhost:4000/api/user/update/${id}/edit`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const { name, email, password, phonenumber, address, city, country } = res.data;
            setName(name);
            setEmail(email);
            setPassword(password);
            setPhonenumber(phonenumber);
            setAddress(address);
            setCity(city);
            setCountry(country);

        }).catch(err => console.error(err));

    }, [id, token]);

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        const data = { name, email, password, phonenumber, address, city, country };

        if (!token) return;

        axios.put(`http://localhost:4000/api/user/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                alert('Cập nhật thành công!');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Update Account Information</h1>

            <form onSubmit={handleSubmitUpdate} className="flex flex-col gap-4 w-full">
                {/* Upload Image */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"
                    />
                </div>

                {/* Product Name */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"

                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Phone Number</label>
                    <input
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                        placeholder="Phone"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"

                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"
                    />
                </div>


                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">City</label>
                    <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"

                    />
                </div>


                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <label className="sm:w-1/4 font-semibold">Country</label>
                    <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-3/4"

                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                    <Link to="/admin-list">
                        <button
                            type="button"
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Back
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateAccount;

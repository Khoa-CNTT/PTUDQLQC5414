import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App';

const AddAccount = ({ token }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/user/add`, {
        name,
        email,
        password,
        phonenumber,
        address,
        city,
        country
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert("success!");
        setName('');
        setEmail('');
        setPassword('');
        setPhonenumber('');
        setAddress('');
        setCity('');
        setCountry('');
      }

    } catch (error) {
      console.error("Lỗi khi thêm tài khoản:", error);
    }
  };

  return (
    <div>
      <p className='mb-5'>Add Acount</p>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div className='w-full'>
          <p className='mb-2'>Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Name' required className='w-full max-w-[500px] px-3 py-2' />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="off" type='email' placeholder='Email' required className='w-full max-w-[500px] px-3 py-2' />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required className='w-full max-w-[500px] px-3 py-2' />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Phonenumber</p>
          <input onChange={(e) => setPhonenumber(e.target.value)} value={phonenumber} type='text' placeholder='Phonenumber' required className='w-full max-w-[500px] px-3 py-2' />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Address</p>
          <input onChange={(e) => setAddress(e.target.value)} value={address} type='text' placeholder='Address' className='w-full max-w-[500px] px-3 py-2' />
        </div>

        <div className='w-full'>
          <p className='mb-2'>City</p>
          <input onChange={(e) => setCity(e.target.value)} value={city} type='text' placeholder='City' className='w-full max-w-[500px] px-3 py-2' />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Country</p>
          <input onChange={(e) => setCountry(e.target.value)} value={country} type='text' placeholder='Country' className='w-full max-w-[500px] px-3 py-2' />
        </div>

        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Thêm tài khoản</button>
      </form>
    </div>
  );
};

export default AddAccount;

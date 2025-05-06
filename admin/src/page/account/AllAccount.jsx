import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../../App'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const AllAccount = ({ token }) => {

  const [listItems, setListItems] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/account', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      if (response.data.success) {
        setListItems(response.data.users);
      }
      else {
        //
      }

    } catch (error) {
      console.log(error)
      //
    }
  }

  const removeUser = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/api/user/remove', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          _id: id
        }
      })

      if (response.data.success) {
        //
        await fetchList();
        //
        toast.success('Success Delete Account!');
      } else {
        //
      }
    } catch (error) {
      console.log(error)
      //
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <>
      <p className='mb-2'>All Account</p>
      <div className='flex flex-col gap-2'>
        {/* Header chỉ hiển thị trên md trở lên */}
        <div className='hidden md:grid grid-cols-[1fr_1.5fr_2fr_2fr_1fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Name</b>
          <b>Email</b>
          <b>Phone Number</b>
          <b>Address</b>
          <b>Update</b>
          <b className='text-center'>Action</b>
        </div>

        {listItems.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap md:grid md:grid-cols-[1fr_1.5fr_2fr_2fr_1fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm'
          >
            <p className='min-w-[80px]'>{item.name}</p>
            <p className='min-w-[80px]'>{item.email}</p>
            <p className='min-w-[60px]'>{item.phonenumber}</p>
            <p className='min-w-[60px]'>{item.address}</p>
            <Link to={`/admin-account/update/${item._id}/edit`}>
              <p className='min-w-[50px] hover:cursor-pointer text-blue-500 hover:underline'>Click</p>
            </Link>
            <p
              onClick={() => removeUser(item._id)}
              className='text-right md:text-center cursor-pointer text-lg text-red-500'
            >
              X
            </p>
          </div>
        ))}
      </div>

    </>
  )
}

export default AllAccount
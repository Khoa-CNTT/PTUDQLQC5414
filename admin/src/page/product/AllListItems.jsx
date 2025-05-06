import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../../App'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const AllListItems = ({ token }) => {

  const [listItems, setListItems] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setListItems(response.data.products);
      }
      else {
        //
      }

    } catch (error) {
      console.log(error)
      //
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/api/product/remove', {
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
        toast.success('Success Delete Item!');
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
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* Header chỉ hiển thị trên md trở lên */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Update</b>
          <b className='text-center'>Action</b>
        </div>

        {listItems.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm'
          >
            <img className='w-12' src={item.image[0]} alt='' />
            <p className='min-w-[80px]'>{item.name}</p>
            <p className='min-w-[70px]'>{item.category}</p>
            <p className='min-w-[60px]'>{currency}{item.price}</p>
            <Link to={`/admin-list/update/${item._id}/edit`}>
              <p className='min-w-[50px] hover:cursor-pointer text-blue-500 hover:underline'>Click</p>
            </Link>
            <p
              onClick={() => removeProduct(item._id)}
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

export default AllListItems
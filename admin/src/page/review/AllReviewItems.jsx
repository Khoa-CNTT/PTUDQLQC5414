import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../../App'
import { Link } from 'react-router-dom'

const AllReviewItem = ({ token }) => {

  const [listItems, setListItems] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list-review', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
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
      const response = await axios.delete(backendUrl + '/api/product/remove-review', {
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
      <p className='mb-2'>All Review List</p>
      <div className='flex flex-col gap-2'>
        {/* Header chỉ hiển thị trên md trở lên */}
        <div className='hidden md:grid grid-cols-[1fr_1fr_3fr_1fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Username</b>
          <b>Rating</b>
          <b>Comment</b>
          <b>Date</b>
          <b className='text-center'>Action</b>
        </div>

        {listItems.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap md:grid md:grid-cols-[1fr_1fr_3fr_1fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm'
          >
            <p className='min-w-[80px]'>{item.username}</p>
            <p className='min-w-[70px]'>{item.rating}</p>
            <p className='min-w-[70px]'>{item.comment}</p>
            <p>{new Date(item.date).toLocaleDateString()}</p>
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

export default AllReviewItem
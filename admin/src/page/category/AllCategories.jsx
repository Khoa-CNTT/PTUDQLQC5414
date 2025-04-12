import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { backendUrl } from '../../App'

const AllCategories = ({ token }) => {
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/category/list')
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeCategory = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/api/category/remove', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          _id: id
        }
      })

      if (response.data.success) {
        await fetchCategories()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <p className='mb-2 text-lg font-semibold'>All Categories</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Name</b>
          <b>Subcategories</b>
          <b>Update</b>
          <b className='text-center'>Action</b>
        </div>

        {categories.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap md:grid md:grid-cols-[1fr_3fr_1fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm'
          >
            <p>{item.name}</p>
            <div className='flex flex-wrap gap-1'>
              {item.subCategories.length > 0 ? (
                item.subCategories.map((sub, i) => (
                  <span key={i} className='px-2 py-1 bg-gray-200 rounded text-xs'>{sub}</span>
                ))
              ) : (
                <span className='italic text-gray-400'>No subcategories</span>
              )}
            </div>

            <p className='cursor-pointer text-blue-500 hover:underline'>
              <Link to={`/admin-category/update/${item._id}/edit`}>
                Click here
              </Link>
            </p>

            <p
              onClick={() => removeCategory(item._id)}
              className='text-red-500 cursor-pointer text-right md:text-center text-lg'
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllCategories

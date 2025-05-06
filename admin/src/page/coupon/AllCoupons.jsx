import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify';

const AllCoupons = ({ token }) => {
  const [coupons, setCoupons] = useState([])

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/coupon/list`)
      if (response.data.success) {
        setCoupons(response.data.coupons)
      } else {
        console.log('Không lấy được danh sách coupon')
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách coupon:', error)
    }
  }

  const removeCoupon = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/coupon/remove`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { _id: id }
      })
      if (response.data.success) {
        await fetchCoupons()
        //
        toast.success('Success Delete Coupon!');
      } else {
        console.log('Xoá thất bại')
      }
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  return (
    <>
      <p className='mb-2'>All Coupons</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Code</b>
          <b>Type</b>
          <b>Value</b>
          <b>Min Order</b>
          <b>Start</b>
          <b>End</b>
          <b>Update</b>
          <b className='text-center'>Action</b>
        </div>

        {coupons.map((coupon, index) => (
          <div
            key={index}
            className='flex flex-wrap md:grid md:grid-cols-[1fr_1fr_1fr_1fr__1fr_1fr_1fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm'
          >
            <p>{coupon.code}</p>
            <p>{coupon.type}</p>
            <p>{coupon.value}{coupon.type === 'percentage' ? '%' : '$'}</p>
            <p>{coupon.minOrder}$</p>
            <p>{new Date(coupon.startDate).toLocaleDateString()}</p>
            <p>{new Date(coupon.endDate).toLocaleDateString()}</p>
            <Link to={`/admin-coupon/update/${coupon._id}/edit`}>
              <p className='min-w-[50px] hover:cursor-pointer text-blue-500 hover:underline'>Click</p>
            </Link>
            <p
              onClick={() => removeCoupon(coupon._id)}
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

export default AllCoupons

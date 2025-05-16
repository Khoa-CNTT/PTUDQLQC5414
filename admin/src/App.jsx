import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import AddItems from './page/product/AddItems'
import AllListItems from './page/product/AllListItems'
import UpdateProduct from './page/product/UpdateProduct'
import AddCategories from './page/category/AddCategories'
import AllCategories from './page/category/AllCategories'
import UpdateCategory from './page/category/UpdateCategory'
import AllOrders from './page/order/AllOrders'
import RevenueCharts from './page/stats/RevenueCharts'
import AllReviewItems from './page/review/AllReviewItems'
import AllAccount from './page/account/AllAccount'
import UpdateAccount from './page/account/UpdateAccount'
import AddAccount from './page/account/AddAcount'
import AllCoupons from './page/coupon/AllCoupons'
import UpdateCoupon from './page/coupon/UpdateCoupon'
import AddCoupon from './page/coupon/AddCoupon'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForecastBestSellers from './page/forecast/ForecastBestSellers'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer position="top-right" autoClose={3000} />
      {token === "" ?
        <Login setToken={setToken} /> : <>
          <div className='ml-10 mr-10'>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  {/* //RevenueCharts */}
                  <Route path='/admin-revenue' element={<RevenueCharts token={token} />} />

                  {/* //ForecastBestSellers */}
                  <Route path='/admin-forecast' element={<ForecastBestSellers token={token} />} />

                  {/* //Account */}
                  <Route path='/admin-add-account' element={<AddAccount token={token} />} />
                  <Route path='/admin-account' element={<AllAccount token={token} />} />
                  <Route path="/admin-account/update/:id/edit" element={<UpdateAccount token={token} />} />

                  {/* product */}
                  <Route path='/admin-add' element={<AddItems token={token} />} />
                  <Route path='/admin-list' element={<AllListItems token={token} />} />
                  <Route path="/admin-list/update/:id/edit" element={<UpdateProduct token={token} />} />

                  {/* category */}
                  <Route path="/admin-add-category" element={<AddCategories token={token} />} />
                  <Route path="/admin-category" element={<AllCategories token={token} />} />
                  <Route path="/admin-category/update/:id/edit" element={<UpdateCategory token={token} />} />

                  {/* order */}
                  <Route path="/admin-order" element={<AllOrders token={token} />} />

                  <Route path="/admin-review" element={<AllReviewItems token={token} />} />

                  {/* coupon */}
                  <Route path='/admin-add-coupon' element={<AddCoupon token={token} />} />
                  <Route path="/admin-coupon" element={<AllCoupons token={token} />} />
                  <Route path="/admin-coupon/update/:id/edit" element={<UpdateCoupon token={token} />} />
                </Routes>
              </div>
            </div>
          </div>
        </>}

    </div>
  )
}

export default App
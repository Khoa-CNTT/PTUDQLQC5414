import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import AddItems from './page/AddItems'
import AllListItems from './page/AllListItems'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      {token === "" ?
        <Login setToken={setToken} /> : <>
          <div className='ml-10 mr-10'>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/admin-add' element={<AddItems token={token} />} />
                  <Route path='/admin-list' element={<AllListItems token={token} />} />
                </Routes>
              </div>
            </div>
          </div>
        </>}

    </div>
  )
}

export default App
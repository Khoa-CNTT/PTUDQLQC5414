import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Product from "./page/Product";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { assets } from "./assets/assets";
import SearchBar from "./components/SearchBar";
import Compilation from "./page/Compilation";
import Login from "./page/Login";
import ResetPassword from "./page/ResetPassword";
import Profile from "./page/Profile";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import Verify from "./page/Verify";
import About from "./page/About";
import Contact from "./page/Contact";
import Order from "./page/Order";

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

//nơi chứa các components chính và định tuyến router
const App = () => {
  return (
    <div>
      <div
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.450), rgba(0, 0, 0, 0.500)), url(${assets.a_cup})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <NavBar />
        <SearchBar />
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compilation" element={<Compilation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/product/:productId" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/orders" element={<Order />} />
          </Routes>
        </>
      </div>

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border border-gray-300">
        <Footer />
      </div>
    </div>
  );
};

export default App;

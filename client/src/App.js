// import React from 'react';
// import './App.css';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Categories from './components/Categories';
// import Products from './components/Products';
// import Cart from './components/Cart';
// import HomePage from './components/HomePage';
// import AdminPage from './components/AdminPage';
// import Login from './components/Login';
// import Register from './components/Register'
// import ProductDetails from './components/ProductDetails';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/categories" element={<Categories />} />
//           <Route path="/products/:categoryId" element={<Products />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/AdminPage" element={<AdminPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Cart from "./components/Cart";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import AdminOrders from "./components/AdminOrders";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetails from "./components/ProductDetails";
import AdminUsers from "./components/AdminUsers";
import UserDetails from "./components/UserDetails";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:categoryId" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/adminOrders" element={<AdminOrders />} />
          <Route path="/admin/user-details/:id" element={<UserDetails />} />
          <Route path="/adminUsers" element={<AdminUsers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

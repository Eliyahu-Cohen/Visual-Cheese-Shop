import React, { useState, useEffect } from "react";
import "./App.css";
import { UserProvider } from "./components/UserContext";

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
import OrderPDF from "./components/OrderPDF";
import UpdateProduct from "./components/UpdateProduct";
import ProductsChart from "./components/ProductsChart";
import HomePageAdmin from "./components/HomePageAdmin";

function App() {
  useEffect(() => {
    const existingCart = localStorage.getItem("cart");
    if (!existingCart || !Array.isArray(JSON.parse(existingCart))) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);
  

  return (
    <UserProvider>
      <Router>
        <div className="App" dir="rtl">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/homePageAdmin" element={<HomePageAdmin />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products/:categoryId" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderPDF" element={<OrderPDF />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/ProductsChart" element={<ProductsChart />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/adminOrders" element={<AdminOrders />} />
            <Route path="/admin/user-details/:id" element={<UserDetails />} />
            <Route path="/admin/products/:id" element={<UpdateProduct />} />
            <Route path="/adminUsers" element={<AdminUsers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

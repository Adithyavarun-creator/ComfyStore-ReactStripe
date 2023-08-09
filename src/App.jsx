import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar";
import Error from "./pages/Error";
import Checkout from "./pages/Checkout";
import SingleProductPage from "./pages/SingleProductPage";
import { useUserContext } from "./context/user_context";
import AuthWrapper from "./pages/AuthWrapper";

const App = () => {
  const { myUser, user } = useUserContext();

  return (
    <>
      <AuthWrapper>
        <BrowserRouter>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            {user && <Route path="/checkout" element={<Checkout />} />}
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/:id"
              children
              element={<SingleProductPage />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AuthWrapper>
    </>
  );
};

export default App;

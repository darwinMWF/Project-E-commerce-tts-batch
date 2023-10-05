import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authChecking } from "./redux/actions/action";

import Login from "./pages/Auth/login/login";
import Register from "./pages/Auth/Register/register";
import Forgotpassword from "./pages/Auth/forgot/forgot";
import Unauth from "./pages/Auth/unAuthrize/unAuth";
import Cart from "./pages/product/cart/cart";
import ProductList from "./pages/product/list/productlist";
import Productdetail from "./pages/product/Detail/product-detail";
import Payment from "./pages/product/payment/payment_summary/payment";
import PaymentSuccess from "./pages/product/payment/payment-response/succes";
import Cancelpayment from "./pages/product/payment/payment-response/cancel";

import "./App.css";

function App() {
  const checkflag = useSelector((state) => state.isUserLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(
      sessionStorage.getItem(window.sessionStorage.key(0))
    );
    if (token) {
      dispatch(
        authChecking({
          email: token.email,
          flag: true,
        })
      );
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={checkflag.islogin === false ? <Unauth /> : <Cart />}
        />
        <Route path="/product/detail/:id" element={<Productdetail />} />
        <Route path="*" element={<h1>page is not found</h1>} />
        <Route path="/forgot/password" element={<Forgotpassword />} />
        <Route path="/add-address/payment" element={<Payment />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<Cancelpayment />} />
      </Routes>
    </>
  );
}

export default App;

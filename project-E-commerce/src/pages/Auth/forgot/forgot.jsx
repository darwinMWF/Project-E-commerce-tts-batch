import React, { useState } from "react";
import Header from "../../../Components/header/header";
import Footer from "../../../Components/footer/footer";
import { sendPasswordResetEmail } from "firebase/auth";
import { Auth } from "../../../config/firebaseconfig";
import LoadingSpinner from "../../../Components/loader/loader";


import "./forgot.css"

const Forgotpassword = () => {
  const [resetPasswordError, setresetPasswordError] = useState({
    message: "",
    isError: false,
  });
  const [ isLoading ,setloading] = useState(false)

  async function ForgotpasswordHandler(e) {
    e.preventDefault();
    setloading(true)
    try {
      await sendPasswordResetEmail(Auth, e.target[0].value);
      setloading(false);
      setresetPasswordError((prev) => {
        return {
          ...prev,
          message:"reset link is sent to your Email",
          isError: true,
        };
      });
      e.target.reset()
    } catch (err) {
      setloading(false)
      setresetPasswordError((prev) => {
        return {
          ...prev,
          message: err.message,
          isError: true,
        };
      });
    }
  }

  return (
    <>
      <Header />
      <div className="container  forgotdiv d-flex flex-column justify-content-center align-items-center">
        
        
        <div className="w-75 " style={{display:"block"}}>
        {resetPasswordError.isError && (
          <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
            {resetPasswordError.message}
          </p>
        )}
        <form onSubmit={ForgotpasswordHandler} className="border p-3 rounded">
        <p className="h1 text-center text-capatalize">Reset Password</p>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            placeholder="abc@gmail.com"
          />
          <button type="submit" className="btn btn-primary my-3 w-100">
          {isLoading ? <LoadingSpinner/>:"send Email"} 
          </button>
        </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgotpassword;

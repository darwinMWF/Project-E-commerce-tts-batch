import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import LoadingSpinner from "../../../Components/loader/loader";
import Targetbtn from "../../../Components/target-buttons/targetBtn";

const ProductBill = ({ list, text, routeForPay, myAddress }) => {
  let sum = 0;
  let totalQuantity = 0;

  const [isLoading, setloading] = useState(false);
  list.map((element) => {
    const productTotal = element.Quantity * element.price;
    sum += productTotal;

    totalQuantity += element.Quantity;
  });
  const floatsum = parseFloat(sum.toFixed(2));
  // discount
  const discountPercentage = 10;
  const discountAmount = (sum * discountPercentage) / 100;

  const discountedTotal = sum - discountAmount;
  const floatdiscount = parseFloat(discountedTotal.toFixed(2));
  // totalAmount
  const totalAmount = sum - discountAmount;
  const floatTotalnumber = parseFloat(totalAmount.toFixed(2));

  async function handlecheckout() {
    setloading(true);
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_FIREBASE_PUBLISH_KEY
      );

      const body = {
        products: list,
        URLs: {
          success: import.meta.env.VITE_PAYMENT_URL_SUCCESSFULL,
          cancel: import.meta.env.VITE_PAYMENT_URL_CANCEL,
        },
      };
      const headers = {
        "Content-Type": "application/json",
        "'Authorization":
          "Bearer pk_test_51Ns59jSIro9HdFAVmrKtIwQjqtxsL5KS1BpA0v7rHKEHnZ6UOeQ3zkA6AnIBg5MSh5CQN6cXEzGGmt8SzqMzuzpF00zrLBwnmP",
      };
      const response = await fetch(
        "https://new-backend-project-e-commerce-backend.onrender.com/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      setloading(false);
    } catch (err) {
      setloading(false);
      alert(err.message);
    }
  }

  return (
    <div className="main p-3">
      {list.length !== 0 && (
        <div className="card main-card ">
          <div className="card-body">
            {myAddress?.flag && (
              <div>
                <p className="h5">Address</p>
                <p className="mb-3 ">{myAddress.Address}</p>
              </div>
            )}
            <div>
              <h5 className="card-title ">Price Details</h5>

              <p className="card-text disable">
                safe and secure payments.Easy returns. 100% Authentic products.
              </p>
              <div className="d-flex justify-content-between">
                <p className="card-text">Price ({totalQuantity} items)</p>
                <p className="card-text">&#x20B9;{floatsum}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="card-text">Discount</p>
                <p className="card-text">{floatdiscount}%</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="card-text">Delivery Charges</p>
                <p className="card-text text-success fw-bold">FREE Delivery</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="card-text fw-semibold fs-5">Total Amount </p>
                <p className="card-text fw-semibold fs-5">
                  &#x20B9;{floatTotalnumber}
                </p>
              </div>
            </div>
            {myAddress?.flag ? (
              <button
                className="btn btn-primary w-100 btnheight"
                onClick={handlecheckout}
              >
                {isLoading ? <LoadingSpinner /> : "checkout"}
              </button>
            ) : (
              <Targetbtn route={routeForPay} btnText={text} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBill;

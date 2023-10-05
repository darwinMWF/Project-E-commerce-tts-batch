import Header from "../../../Components/header/header";
import Footer from "../../../Components/footer/footer";
import ProductBill from "./cart_bill";
import { useSelector } from "react-redux";
import "./cart.css";
import AddedProduct from "./cart_product";
import ConfimationAndAlert from "../../../Components/alertingComponent/confirmationAndAlert";
import useWindowSize from "../../../Components/media-query/size";
const Cart = () => {
  const size = useWindowSize()
  const cartData = useSelector((state) => state.cartProduct);

  if (cartData.length === 0) {
    return (
      <>
        <ConfimationAndAlert
          ImageInfo={{
            url: "https://cdn-icons-png.flaticon.com/512/2762/2762885.png",
            alt: "empty cart",
          }}
          route={"/"}
          message={"cart is empty"}
          btnText={"return to shopping"}
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container d-flex flex-md-row  border flex-column p-5" style={{height: size.width>992  ? "100vh":"auto"}}>
        <AddedProduct list={cartData} />
        <ProductBill
          list={cartData}
          routeForPay={"/add-address/payment"}
          text={"Place Order"}
        />
      </div>
      <Footer />
    </>
  );
};

export default Cart;

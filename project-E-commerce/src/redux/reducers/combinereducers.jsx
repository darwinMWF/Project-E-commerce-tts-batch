import { combineReducers } from "redux";
import productreducer from "./reducers";

const reducers = combineReducers({
  Allproduct: productreducer.productListReducer,
  selectedProduct: productreducer.selectedProductReducer,
  cartProduct: productreducer.addToCartReducer,
  isUserLoggedIn: productreducer.Authentication,
});

export default reducers;

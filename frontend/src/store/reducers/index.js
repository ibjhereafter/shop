import { combineReducers } from "redux";

import productsReducer from "./productsReducer";
import productDetailsReducer from "./productDetailsReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import registrationReducer from "./registrationReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import orderDetailsReducer from "./orderDetailsReducer";
import orderPaymentReducer from "./orderPaymentReducer";
import adminReducer from "./adminReducer";



const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    order: orderReducer,
    authentication: authReducer,
    newUser: registrationReducer,
    userProfile: userReducer,
    orderDetails: orderDetailsReducer,
    paidOrder: orderPaymentReducer,
    admin: adminReducer
});

export default rootReducer;
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import rootReducer from "./reducers/index";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const getPaymentMethodFromLocalStorage = () => {
    let paymentMethod = '';
    const getPaymentMethod = localStorage.getItem('paymentMethod');
    if (getPaymentMethod) {
        const payment = JSON.parse(getPaymentMethod);
        return paymentMethod = payment;
    } else {
        return paymentMethod;
    }
}

const getShippingAddressFromLocalStorage = () => {
    let shippingAddress = {};
    const getShippingAddress = localStorage.getItem('shipping');
    if (getShippingAddress) {
        const shippingInfo = JSON.parse(getShippingAddress);
        shippingAddress = {...shippingInfo };
        return shippingAddress;
    } else {
        return shippingAddress;
    }
}

const getNewUserFromLocalStorage = () => {
    let newUser = {};
    const getNewUser = localStorage.getItem('newUser');

    if (getNewUser) {
        const user = JSON.parse(getNewUser);
        newUser = {...user};
        return newUser;
    } else {
        return newUser;
    }
};

const getCartFromLocalStorage = () => {
    let data = [];
    const getCartItems = localStorage.getItem('cartItems');
    if (getCartItems) {
        const items = JSON.parse(getCartItems);
        data = [...items];
        return data;
    } else {
        return data;
    }
};

const getLoggedInUserFromLocalStorage = () => {
    let user = {};
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
        const user = { ...JSON.parse(existingUser) };
        return user;
    } else {
        return user;
    }
};

const newUserInfo = {
    login: false,
    registrationMessage: '',
    error: false,
    newUser: getNewUserFromLocalStorage()
}

const loggedInUserInfo = {
    login: false,
    loginMessage: '',
    error: false,
    user: getLoggedInUserFromLocalStorage()
}

const cartInfo = {
    loading: true,
    error: 'false',
    message: '',
    cartItems: getCartFromLocalStorage(),
    shippingAddress: getShippingAddressFromLocalStorage(),
    paymentMethod: getPaymentMethodFromLocalStorage()
};

const initialState = {
    cart: cartInfo,
    authentication: loggedInUserInfo,
    newUser: newUserInfo
};

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),

);


const ReduxConfiguration = (props) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};

export default ReduxConfiguration;
import axios from "axios";
import * as actionTypes from '../actions/actionTypes';
import history from "../../history";

const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

const getCartProduct = (action) => {
    return {
        type: actionTypes.GET_CART_PRODUCT,
        payload: action
    }
};

const removeCartItem = (action) => {
    return {
        type: actionTypes.REMOVE_CART_ITEM,
        payload: action
    }
};

export const startRemoveCartItem = (itemId) => {
    return (dispatch, getState) => {
        dispatch(removeCartItem(itemId));
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        history.push('/cart');
    }
};

export const startGetCartProduct = (_id, quantity) => {
    return async (dispatch) => {
        try {
            const url = `/products/${_id}`;
            const { data } = await axios.get(url, axiosOption);

            const cartItem = {
                _id: data._id,
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                stock: data.stock,
                quantity
            };

            let cart = [];
            const items = localStorage.getItem('cartItems');
            if (items) {
                const cartFromLocalStorage = JSON.parse(items);
                cart = [...cartFromLocalStorage];
            }

            cart.push(cartItem);

            localStorage.setItem('cartItems', JSON.stringify(cart));
            dispatch(getCartProduct(cartItem));
            history.push('/cart');

        } catch (error) {

        }
    }
};

export const getShippingAddress = (action) => {
    return {
        type: actionTypes.GET_SHIPPING_ADDRESS,
        payload: action
    }
};

export const getPaymentMethod = (action) => {
    return {
        type: actionTypes.GET_PAYMENT,
        payload: action
    }
}


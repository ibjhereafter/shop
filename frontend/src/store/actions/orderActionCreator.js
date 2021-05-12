import * as actionTypes from './actionTypes';
import axios from "axios";
import history from "../../history";
import { startLogOut } from "./authActionCreator";

const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

const getCreatedOrder = (action) => {
    return {
        type: actionTypes.GET_CREATE_ORDER,
        payload: action
    };
};

const getCreateOrderFailure = (action) => {
    return {
        type: actionTypes.GET_CREATE_ORDER_FAILURE,
        payload: action
    };
};

const resetCartItems = (action) => {
    return {
        type: actionTypes.RESET_CART_ITEMS,
        payload: action
    };
};

export const startGetCreateOrOrder = (newOrder) => {
    return async (dispatch) => {
        try {
            const url = '/orders/create';
            const { data } = await axios.post(url, newOrder, axiosOption);
            dispatch(getCreatedOrder(data));
            localStorage.removeItem('cartItems');
            dispatch(resetCartItems([]));
            history.push(`/orders/${data._id}/details`);

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 400) {
                    localStorage.removeItem('user');
                    dispatch(getCreateOrderFailure(error.response.data.error));
                    dispatch(startLogOut());
                    history.push('/users/login');
                } else {
                    dispatch(getCreateOrderFailure(error.response.data.error));
                }
            }
        }

    }
}

const getUserMyOrdersFailure = (action) => {
    return {
        type: actionTypes.GET_USERS_MY_ORDERS_FAILURE,
        payload: action
    }
};

const getUserMyOrders = (action) => {
    return {
        type: actionTypes.GET_USERS_MY_ORDERS,
        payload: action
    }
}

export const startGetUserMyOrders = () => {
    return async (dispatch) => {
        try {
            const url = '/orders/myorders';
            const { data } = await axios.get(url, axiosOption);
            dispatch(getUserMyOrders(data));

        } catch (error) {
            if (error.response.status === 401 || error.response.status === 400) {
                dispatch(getUserMyOrdersFailure(error.response.data.error));
                history.push('/users/login');
            } else {
                dispatch(getUserMyOrdersFailure(error.response));
            }
        }
    }
}
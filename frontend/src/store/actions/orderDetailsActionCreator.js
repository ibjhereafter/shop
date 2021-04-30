import * as actionTypes from '../actions/actionTypes';
import axios from "axios";
import history from "../../history";

const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

const getOrderDetails = (action) => {
    return {
        type: actionTypes.GET_ORDER_DETAILS,
        payload: action
    }
};

const logOut = () => {
    return {
        type: actionTypes.LOG_OUT,
    }
};


export const startGetOrderDetails = (orderId) => {
    return async (dispatch) => {
        try {
            const url = `/orders/${orderId}`;
            const { data } = await axios.get(url, axiosOption);
            delete data.user.password;
            delete data.user.token;
            delete data.user.createdAt;
            delete data.user.updatedAt;
            delete data.user.__v;

            dispatch(getOrderDetails(data));
        } catch (error) {
            if (error.response === 401) {
                dispatch(logOut());
                history.push('/users/login');
            }

        }
    }
};
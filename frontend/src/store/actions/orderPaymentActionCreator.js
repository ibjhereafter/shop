import * as actionTypes from './actionTypes';
import axios from "axios";
import history from "../../history";

const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

const getOrderPaymentFailure = (action) => {
    return {
        type: actionTypes.ORDER_PAYMENT_FAILURE,
        payload: action.payload
    }
};

export const resetOrderPayment = () => {
    return {
        type: actionTypes.ORDER_PAYMENT_RESET
    }
};

const getOrderDetails = (action) => {
    return {
        type: actionTypes.GET_ORDER_DETAILS,
        payload: action
    }
};

export const startGetOrderPayment = (orderId, paymentResult) => {
    return async (dispatch) => {
        try {
            const url = `/orders/${orderId}/pay`;
            const { data } = await axios.patch(url, paymentResult, axiosOption);
            delete data.user.password;
            delete data.user.token;
            delete data.user.createdAt;
            delete data.user.updatedAt;
            delete data.user.__v;
            dispatch(getOrderDetails(data));

        } catch (error) {
            if (error.response.status === 401 || 400) {
                dispatch(getOrderPaymentFailure(error.response.data.error));
                history.push('/users/login');
            }

            if (error.response) {
                dispatch(getOrderPaymentFailure(error.response.data.error));
                dispatch(getOrderPaymentFailure(error.response))
            }
        }
    }
};

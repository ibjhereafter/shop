import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    loading: true,
    success:false,
    error: false,
    errorMessage: '',
    paidOrder: {}
};
const orderPaymentReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.ORDER_PAYMENT:
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage: 'You have successfully paid for the your order',
                success: true,
                paidOrder: action.payload
            }

        case actionTypes.ORDER_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: 'The payment was not successful!',
                success: false,
                paidOrder: {}
            }
        case actionTypes.ORDER_PAYMENT_RESET:
            return {};

        default:
            return state;
    }
};

export default orderPaymentReducer;
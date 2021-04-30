import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    loading: true,
    error: false,
    errorMessage: '',
    orderDetails: {}
};

const orderDetailsReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDER_DETAILS:
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage: 'You have successfully fetched the order',
                orderDetails: action.payload
            }

        case actionTypes.GET_CREATE_ORDER_FAILURE:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload,
                orderDetails: {}
            }
        default:
            return state;
    }
};

export default orderDetailsReducer;
import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    success: false,
    error: false,
    errorMessage: '',
    loading: true,
    userOrders: [],
    createdOrder: {}
};

const orderReducer = (state= INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.GET_CREATE_ORDER: {
            return {
                ...state,
                success: true,
                error: false,
                errorMessage: 'You have successfully created an order.',
                createdOrder: action.payload
            }
        }

        case actionTypes.GET_USERS_MY_ORDERS:
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage: '',
                userOrders: action.payload
            }

        case actionTypes.GET_USERS_MY_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
                userOrders: []
            }

        case actionTypes.GET_CREATE_ORDER_FAILURE:
            return {
                ...state,
                success: false,
                error: true,
                errorMessage: action.payload,
                createdOrder: {}
            }

        default:
            return state;
    }
};

export default orderReducer;
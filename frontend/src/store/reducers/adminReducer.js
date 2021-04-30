import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    deleteUserMessage: '',
    singleUser: {},
    singleUserToBeEdited: {},
    productToBeDeleted: {},
    productToBeEdited: {},
    delivered: {},

    allOrders: {
        loading: true,
        error: false,
        errorMessage: '',
        allOrders: [],
    },

    users: {
        loading: true,
        error: false,
        errorMessage:'',
        users: [],
    },

    products: {
        loading: true,
        error: false,
        errorMessage: '',
        products: []
    },

    orders: {
        loading: true,
        error: false,
        errorMessage:'',
        orders: []
    }

};

const adminReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {

        case actionTypes.MARK_DELIVERED:
            return {
                ...state,
                delivered: action.payload
            }

        case actionTypes.ADMIN_GET_ORDERS:
            return {
                ...state,
                allOrders: {
                    loading: false,
                    error: false,
                    errorMessage: '',
                    allOrders: action.payload,
                },
            }

        case actionTypes.ADMIN_GET_ORDERS_FAILURE:
            return {
                ...state
            }

        case actionTypes.ADMIN_EDIT_PRODUCT:
            return {
                ...state,
                productToBeEdited: action.payload
            }
        case actionTypes.ADMIN_GET_PRODUCT_TO_BE_DELETED:
            return {
                ...state,
                productToBeDeleted: action.payload

            }
        case actionTypes.ADMIN_GET_ALL_PRODUCTS:
            return {
                ...state,
                products: {
                    loading: false,
                    error: false,
                    errorMessage: 'You have successfully fetched all the products.',
                    products: action.payload
                },
            }

        case actionTypes.ADMIN_GET_ALL_PRODUCTS_FAILURE:
            return {
                ...state
            }
        case actionTypes.ADMIN_GET_USERS:
            return {
                ...state,
                users: {
                    loading: false,
                    error: false,
                    errorMessage: 'You have successfully fetched all the users',
                    users: action.payload
                }
            }

        case actionTypes.ADMIN_DELETE_USER_FAILURE:
            return {
                ...state,
                deleteUserMessage: action.payload
            }
        case actionTypes.ADMIN_USER_TO_BE_EDITED:
            return {
                ...state,
                singleUserToBeEdited: action.payload
            }

        case actionTypes.ADMIN_GET_SINGLE_USER_PROFILE:
            return {
                ...state,
                singleUser: action.payload
            }

        case actionTypes.ADMIN_GET_SINGLE_USER_PROFILE_FAILURE:
            return {
                ...state
            }

        default:
            return state;
    }

};

export default adminReducer;
import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    loading: true,
    error: false,
    message: null,
    totalProducts: 0,
    products: []

};

const productsReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_PRODUCTS: {
            return {
                loading: false,
                message: 'Products successfully fetched.',
                products: action.payload
            }
        }

        case actionTypes.GET_TOTAL_PRODUCTS: {
            return {
                ...state,
                totalProducts: action.payload
            }
        }

        case actionTypes.GET_ALL_PRODUCTS_FAILURE: {
            return {
                ...state,
                error: true,
                message: action.payload,
                loading: false,
                totalProducts: 0,
                products: []
            }
        }

        default:
            return state;
    }

};

export default productsReducer;
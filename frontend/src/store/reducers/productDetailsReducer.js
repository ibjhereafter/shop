import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    loading: true,
    error: false,
    message: '',
    product: {}

};

const productDetails = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_DETAILS: {
            return {
                ...state,
                loading: false,
                error: false,
                message: 'Product has been successfully fetched!',
                product: action.payload
            }

        }

        case actionTypes.GET_PRODUCT_DETAILS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload,
                product: {}
            }
        }

        default:
            return state;
    }
};

export default productDetails;
import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    error: false,
    loading: true,
    errorMessage: '',
    highestRatedProducts: []
};

const highestRatedProductsReducer = (state=INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.GET_HIGHEST_RATED_PRODUCT:
            return {
                ...state,
                error: false,
                loading: false,
                errorMessage: '',
                highestRatedProducts: action.payload
            }

        case actionTypes.GET_HIGHEST_RATED_PRODUCT_FAILURE:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload,
                highestRatedProducts: []
            }

        default:
            return state;
    }
}

export default highestRatedProductsReducer;

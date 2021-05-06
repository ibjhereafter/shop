import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    loading: true,
    error: false,
    errorMessage: '',
    reviews: []
};

const productReviews = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_REVIEWS:
            return {
                loading: false,
                error: false,
                reviews: action.payload
            }
        case actionTypes.RESET_CREATE_PRODUCT_REVIEW_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload
            }
        case actionTypes.CREATE_PRODUCT_REVIEW_FAILURE:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }
        default:
            return state;
    }
};

export default productReviews;
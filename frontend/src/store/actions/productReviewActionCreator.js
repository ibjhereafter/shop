import axios from "axios";
import * as actionTypes from './actionTypes';
import history from "../../history";
const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

const createReviewFailure = (action) => {
    return {
        type: actionTypes.CREATE_PRODUCT_REVIEW_FAILURE,
        payload: action
    }
};

export const getProductReviews = (action) => {
    return {
        type: actionTypes.GET_PRODUCT_REVIEWS,
        payload: action
    }
};

export const startCreateProductReview = (productId, newReview) => {
    return async (dispatch) => {
        try {
            const url = `/products/${productId}/review`;
            await axios.post(url, newReview, axiosOption);
            history.push(`/products/${productId}/details`);

        } catch (error) {
            if (error.response) {
                dispatch(createReviewFailure(error.response.data.error))
            } else {
                dispatch(createReviewFailure(error));
            }
        }
    }
};
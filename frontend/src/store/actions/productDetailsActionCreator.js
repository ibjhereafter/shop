import axios from "axios";
import * as actionTypes from './actionTypes';
import { getProductReviews } from './productReviewActionCreator';

const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

export const getProductDetails = (action) => {
    return {
        type: actionTypes.GET_PRODUCT_DETAILS,
        payload: action
    }
};

const getProductsDetailsFailure = (action) => {
    return {
        type: actionTypes.GET_PRODUCT_DETAILS_FAILURE,
        payload: action
    }
};

export const startGetProductDetails = (productId) => {
    return async (dispatch) => {
        try {
            const url = `/products/${productId}`;
            const { data } = await axios.get(url, axiosOption);
            dispatch(getProductDetails(data));
            dispatch(getProductReviews(data.reviews));
            history.push(`/products/${productId}`);

        } catch (error) {
            if (error.response) {
                dispatch(getProductsDetailsFailure(error.response.data.error));
            }
        }
    }
};
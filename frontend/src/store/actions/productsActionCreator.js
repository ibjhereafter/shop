import axios from 'axios';
import * as actionTypes from './actionTypes';

const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

const getAllProducts = (action) => {
    return {
        type: actionTypes.GET_ALL_PRODUCTS,
        payload: action
    }
};

const getTotalProducts = (action) => {
    return {
        type: actionTypes.GET_TOTAL_PRODUCTS,
        payload: action
    }
};

const getAllProductsAllFailure = (action) => {
    return {
        type: actionTypes.GET_ALL_PRODUCTS_FAILURE,
        payload: action
    }
};

export const startGetAllProducts = (keyword = '') => {
    return async (dispatch) => {
        try {
            const url = `/products/all?keyword=${keyword}`;
            const { data } = await axios.get(url, axiosOption);
            dispatch(getAllProducts(data.products));
            dispatch(getTotalProducts(data.totalProducts));

        } catch (error) {
            if (error.response) {
                dispatch(getAllProductsAllFailure(error.response.data.error));

            } else {
                dispatch(getAllProductsAllFailure('Error has been encountered. Please, try again'));
            }
        }
    }
};

const getHighestRatedProductsFailure = (action) => {
    return {
        type: actionTypes.GET_HIGHEST_RATED_PRODUCT_FAILURE,
        payload: action
    }
};

const getHighestRatedProducts = (action) => {
    return {
        type: actionTypes.GET_HIGHEST_RATED_PRODUCT,
        payload: action
    }
}

export const startGetHighestRatedProducts = () => {
    return async (dispatch) => {
        try {
            const url = '/products/rated';
            const { data } = await axios.get(url, axiosOption);
            dispatch(getHighestRatedProducts(data));

        } catch (error) {
            if (error.response) {
                dispatch(getHighestRatedProductsFailure(error.response.data.error))

            } else {
                dispatch(getAllProductsAllFailure(error));
            }
        }
    }
};
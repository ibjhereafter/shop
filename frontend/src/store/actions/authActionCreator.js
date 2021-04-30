import axios from "axios";
import * as actionTypes from './actionTypes';
import history from "../../history";

const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

export const logIn = (action) => {
    return {
        type: actionTypes.LOG_IN,
        payload: action
    }
};

const logInError = (action) => {
    return {
        type: actionTypes.LOG_IN_FAILURE,
        payload: action
    }
};

export const startLogIn = (userCredentials) => {
    return async (dispatch, getState) => {
        try {
            const url = `/users/login`;
            const { data } = await axios.post(url, userCredentials, axiosOption);
            dispatch(logIn(data));
            localStorage.setItem('user', JSON.stringify(getState().authentication.user));
            history.push('/');
        } catch (error) {
            if (error) {
                dispatch(logInError(error.response.data.error));
            } else {
                dispatch(logInError(error.message));
                history.push('/users/login');
            }
        }
    }
};

export const logOut = () => {
    return {
        type: actionTypes.LOG_OUT,
    }
};

export const startLogOut = () => {
    return async (dispatch) => {
        try {
            const url = '/users/logout';
            await axios.post(url,{}, axiosOption);
            localStorage.removeItem('user');
            dispatch(logOut());
            history.push('/');
        } catch (error) {
            if (error.response === 401) {
                dispatch(logInError(error.response.data.error));
                history.push('/users/login')
            } else {
                dispatch(logInError(error.message));
                history.push('/');
            }

        }
    }
};
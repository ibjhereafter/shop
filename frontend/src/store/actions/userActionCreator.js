import axios from "axios";
import * as actionTypes from './actionTypes';
import history from "../../history";
import { logIn } from "./authActionCreator";

const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

const registerUser = (action) => {
    return {
        type: actionTypes.REGISTER_USER,
        payload: action
    }
};

const registerUserFailure = (action) => {
    return {
        type: actionTypes.REGISTER_USER_FAILURE,
        payload: action
    }
};

export const resetRegistrationMessage = (action) => {
    return {
        type: actionTypes.RESET_REGISTERED_USER_MESSAGE,
        payload: action
    }
};

const getUserProfile = (action) => {
    return {
        type: actionTypes.USER_PROFILE,
        payload: action
    }
};

const getUserProfileFailure = (action) => {
    return {
        type: actionTypes.USER_PROFILE_FAILURE,
        payload: action
    }
};

export const startUpdateProfile = (update, photo) => {
    return async (dispatch, getState) => {
        try {
            const uploadUrl = '/upload';
            const { data: image } = await axios.post(uploadUrl, { image: photo }, axiosOption);

            const edition = {
                ...update,
                image
            }

            const url = '/users/update/profile';
            const { data } = await axios.patch(url, edition, axiosOption);
            dispatch(getUserProfile(data));
            localStorage.setItem('user', JSON.stringify(getState().authentication.user));
            history.push('/users/profile');

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    dispatch(logOut())
                    localStorage.removeItem('user');
                    history.push('/users/login');

                } else {
                    dispatch(getUserProfileFailure(error.response.data.error));
                }
            }

        }
    }
}

export const startUploadProfileImage = (image, id) => {
    return async () => {
        try {
            const url = '/users/update/profileimage';
            await axios.post(url, image, axiosOption);
            history.push(`/users/${id}`);

        } catch (error) {

        }
    }
}



export const startGetUserProfile = () => {
    return async (dispatch) => {
        try {
            const url = '/users/me';
            const { data } = await axios.get(url, axiosOption);
            dispatch(getUserProfile(data));

        } catch (error) {
            if (error.response) {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 400) {
                        dispatch(logOut());
                        localStorage.removeItem('user');
                        history.push('/users/login');

                    } else {
                        dispatch(getUserProfileFailure(error.response.data.error));
                    }
                }
            }
        }
    }
};

const logOut = () => {
    return {
        type: actionTypes.LOG_OUT,
    }
};

const resetCartItems = () => {
    return {
        type: actionTypes.RESET_CART_ITEMS_FOR_REGISTERED_USER
    }
};

export const startRegister = (user, photo) => {
    return async (dispatch,getState) => {
        try {
            const uploadUrl = '/upload';
            const { data: image } = await axios.post(uploadUrl, {image: photo}, axiosOption);

            const newUser = {
                ...user,
                image
            }
            const url = '/users/register';

            const { data } = await axios.post(url, newUser, axiosOption);
            dispatch(registerUser(data));
            dispatch(logIn(data));
            localStorage.setItem('user', JSON.stringify(getState().authentication.user));
            localStorage.setItem('newUser', JSON.stringify(getState().newUser.newUser));
            localStorage.removeItem('cartItems');
            dispatch(resetCartItems());

            history.push('/');
        } catch (error) {
            if (error) {
                dispatch(registerUserFailure(error.response.data.error));
            } else {
                dispatch(registerUserFailure(error.message));
                history.push('/users/login');
            }
        }
    }
};
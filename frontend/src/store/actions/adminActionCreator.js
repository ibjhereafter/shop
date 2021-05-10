import * as actionTypes from './actionTypes';
import axios from "axios";
import history from "../../history";

const axiosOption = {
    mode: 'cors',
    withCredentials: true
};

export const startGetProductToBeEdited = (productId) => {
    return async () => {
        try {
            const url = `/admin/products/${productId}`;
            await axios.get(url, axiosOption);

        } catch (error) {

        }
    }
};

export const startAdminCreateProduct = (product, file) => {
    return async () => {
        try {
            const uploadUrl = '/images';
            const { data: image } = await axios.post(uploadUrl, file, {
                headers: {
                    'Accept': 'multipart/form-data',
                    'Content-Type': 'multipart/form-data',
                }
            });

            const url = '/admin/products/create';
            const newProduct = {
                ...product,
                image
            }
            await axios.post(url, newProduct);
            history.push('/admin/products');

        } catch (error) {
            if (error.response) {
                console.log(error.response);
            }

        }
    }
};


const adminGetProductToBeDeleted = (action) => {
    return {
        type: actionTypes.ADMIN_GET_PRODUCT_TO_BE_DELETED,
        payload: action
    }
};

export const startAdminDeleteProduct = (productId) => {
    return async () => {
        try {
            const url = `/admin/products/${productId}/delete`;
            await axios.delete(url, axiosOption);
            history.push('/admin/products');
        } catch (error) {

        }
    }
};

export const startAdminGetProductToBeDeleted = (productId) => {
    return async (dispatch) => {
        try {
            const url = `/admin/products/${productId}`;
            const { data } = await axios.get(url, axiosOption);
            dispatch(adminGetProductToBeDeleted(data));

        } catch (error) {

        }
    }
}

const adminGetAllProducts = (action) => {
    return {
        type: actionTypes.ADMIN_GET_ALL_PRODUCTS,
        payload: action
    }
}

export const startAdminGetAllProducts = () => {
    return async (dispatch) => {
        try {
            const url = '/admin/products';
            const { data } = await axios.get(url, axiosOption);
            dispatch(adminGetAllProducts(data));
        } catch (error) {

        }
    }
}
const getAdminUsersFailure = (action) => {
    return {
        type: actionTypes.ADMIN_GET_USERS_FAILURE,
        payload: action
    }
};

const getAdminUsers = (action) => {
    return {
        type: actionTypes.ADMIN_GET_USERS,
        payload: action
    }
};

const adminEditUserProfileFailure = () => {
    return {
        type: actionTypes.ADMIN_USER_EDIT_FAILURE
    }
}

export const startAdminEditUserProfile = (userId, edit) => {
    return async (dispatch) => {
        try {
            const url = `/admin/users/${userId}/edit`;
            await axios.patch(url, edit, axiosOption);
            history.push('/admin');
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 400) {
                dispatch(adminEditUserProfileFailure());
                history.push('/users/login');
            } else {
                dispatch(adminEditUserProfileFailure());
                history.push('/admin');
            }

        }
    }
}


export const startAdminGetUserProfileToBeEdited = (userId) => {
    return async (dispatch) => {
        try {
            const url = `/admin/users/${userId}`;
            const { data } = await axios.get(url, axiosOption);
            dispatch(adminGetUserProfileToBeEdited(data));

        } catch (error) {
            if (error.response.status === 401 || error.response.status === 400) {
                dispatch(adminGetUserProfileToBeDeletedFailure());
                history.push('/users/login');
            } else {
                dispatch(adminGetUserProfileToBeDeletedFailure());
                history.push('/admin');
            }

        }
    }
};

export const startGetAdminUsers = () => {
    return async (dispatch) => {
        try {
            const url = '/admin/users';
            const { data } = await axios.get(url, axiosOption);
            dispatch(getAdminUsers(data));

        } catch (error) {
            if (error.response.status === 401 || error.response.status === 400) {
                dispatch(getAdminUsersFailure(error.response.data.error));
                history.push('/users/login');
            } else {
                dispatch(getAdminUsersFailure(error.response.data.error));
            }
        }
    }
};

const adminDeleteUSerFailure = (action) => {
    return {
        type: actionTypes.ADMIN_DELETE_USER_FAILURE,
        payload: action
    }
};

export const resetDeleteUserMessage = (action) => {
    return {
        type: actionTypes.ADMIN_DELETE_USER_RESET_MESSAGE,
        payload: action
    }
}

const adminDeleteUSer = (action) => {
    return {
        type: actionTypes.ADMIN_DELETE_USER,
        payload: action
    }
};

const adminGetUserProfileToBeDeleted = (action) => {
    return {
        type: actionTypes.ADMIN_GET_SINGLE_USER_PROFILE,
        payload: action
    }
};

const adminGetUserProfileToBeEdited = (action) => {
    return {
        type: actionTypes.ADMIN_USER_TO_BE_EDITED,
        payload: action
    }
};


const adminGetUserProfileToBeDeletedFailure = () => {
    return {
        type: actionTypes.ADMIN_GET_SINGLE_USER_PROFILE_FAILURE,
    }
}

export const startAdminGetUserProfileToBeDeleted = (userId) => {
    return async (dispatch) => {
        try {
            const url = `/admin/users/${userId}`;
            const { data } = await axios.get(url, axiosOption);
            dispatch(adminGetUserProfileToBeDeleted(data));

        } catch (error) {
            if (error.response.status === 401 || error.response.status === 400) {
                dispatch(adminGetUserProfileToBeDeletedFailure());
                history.push('/users/login');
            } else {
                dispatch(adminGetUserProfileToBeDeletedFailure());
                history.push('/admin');
            }

        }
    }
};

export const startAdminDeleteUser = (userId) => {
    return async (dispatch) => {
        try {
            const url = `/admin/users/${userId}`;
            await axios.delete(url, axiosOption);
            dispatch(adminDeleteUSer('User has been successfully deleted!'));
            dispatch(adminGetUserProfileToBeDeleted({}));
            history.push('/admin/users');
            history.push('/admin');
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 400) {
                dispatch(adminDeleteUSerFailure(error.response.data.error));
                history.push('/users/login');
            } else {
                dispatch(adminDeleteUSerFailure(error.response.data.error));
            }

        }
    }
};

const adminGetProductToBeEdited = (action) => {
    return {
        type: actionTypes.ADMIN_EDIT_PRODUCT,
        payload: action
    }
};

export const startAdminGetProductToBeEdited = (productId) => {
    return async (dispatch) => {
        try {
            const url = `/admin/products/${productId}`;
            const { data } = await axios.get(url, axiosOption);
            dispatch(adminGetProductToBeEdited(data));

        } catch (error) {

        }
    }
};

export const startAdminEditProduct = (productId, file, edit) => {
    return async () => {
        try {
            const imageUrl = '/images';
            const { data: image } = await axios.post(imageUrl, file, {
                headers: {
                    'Accept': 'multipart/form-data',
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log(image)

            const edition = {
                ...edit,
                image
            }

            const url = `/admin/products/${productId}/edit`;
            await axios.patch(url, edition, axiosOption);
            history.push('/admin/products');

        } catch (error) {

        }
    }
};

//#################################################################################
// ORDERS

const adminGetAllOrders = (action) => {
    return {
        type: actionTypes.ADMIN_GET_ORDERS,
        payload: action
    }
};

export const startAdminGetAllOrders = () => {
    return async (dispatch) => {
        try {
            const url = '/admin/orders';
            const { data } = await axios.get(url, axiosOption);
            dispatch(adminGetAllOrders(data));

        } catch (error) {

        }
    }
};

const adminMarkOrderAsDelivered = (action) => {
    return {
        type: actionTypes.MARK_DELIVERED,
        payload: action
    }
}

export const startAdminMarkOrderAsDelivered = (orderId) => {
    return async (dispatch) => {
        try {
            const url = `/admin/orders/${orderId}/deliver`;
            const { data } = await axios.patch(url, {}, axiosOption);
            dispatch(adminMarkOrderAsDelivered(data));
            history.push('/admin/orders');
        } catch (error) {

        }
    }
}
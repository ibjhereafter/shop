import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    user: {},
    login: false,
    loginMessage: '',
    error: false
};

const authReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN: {
            return {
                ...state,
                user: { ...action.payload },
                login: true,
                loginMessage: 'You have successfully signed in!',
                error: false
            }
        }

        case actionTypes.LOG_OUT: {
            return {
                ...state,
                login: false,
                loginMessage: 'You have successfully signed out!',
                error: false,
                user: {}
            }
        }

        case actionTypes.LOG_IN_FAILURE: {
            return {
                ...state,
                user: {},
                login: false,
                loginMessage: action.payload,
                error: true
            }
        }

        default:
            return state;
    }
};

export default authReducer;
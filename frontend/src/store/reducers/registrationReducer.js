import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    newUser: {},
    login: false,
    registrationMessage: '',
    error: false
};

const registrationReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_USER: {
            return {
                ...state,
                login: true,
                registrationMessage: 'You have successfully registered!',
                error: false,
                newUser: action.payload
            }
        }

        case actionTypes.REGISTER_USER_FAILURE: {
            return {
                ...state,
                login: false,
                registrationMessage: action.payload,
                error: true,
                newUser: {}
            }
        }

        case actionTypes.RESET_REGISTERED_USER_MESSAGE: {
            return {
                ...state,
                registrationMessage: action.payload
            }
        }

        default:
            return state;
    }

};

export default registrationReducer;
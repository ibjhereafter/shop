import * as actionTypes from '../actions/actionTypes';

const INITIAL_DATA = {
    name: '',
    email: '',
    password: '',
    image: ''
};

const userReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE: {
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                _id: action.payload._id,
                image: action.payload.image
            }
        }

        case actionTypes.USER_PROFILE_FAILURE: {
            return {
                ...state
            }
        }
        default:
            return state;
    }
};

export default userReducer;
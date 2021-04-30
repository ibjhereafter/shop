import * as actionTypes from '../actions/actionTypes';

const getCartItems = localStorage.getItem('cartItems');

let cartItems = [];

if (getCartItems) {
    const items = JSON.parse(getCartItems);
    cartItems = [...items];
}

const INITIAL_DATA = {
    loading: true,
    error: false,
    message: '',
    cartItems: [...cartItems],
    shippingAddress: {},
    paymentMethod: ''
}

const cartReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {

        case actionTypes.RESET_CART_ITEMS: {
            return {
                ...state,
                cartItems: action.payload
            }
        }

        case actionTypes.RESET_CART_ITEMS_FOR_REGISTERED_USER:
            return {
                ...state,
                cartItems: []
            }

        case actionTypes.GET_SHIPPING_ADDRESS: {
            return {
                ...state,
                shippingAddress: action.payload
            }
        }

        case actionTypes.GET_PAYMENT: {
            return {
                ...state,
                paymentMethod: action.payload
            }
        }

        case actionTypes.GET_CART_PRODUCT: {
            const cart = {...action.payload};

            const filteredState = state.cartItems.filter((item) => {
                return cart._id === item._id;
            });

            if (filteredState.length > 0 ) {
                return {
                    ...state
                }
            } else {
                state.cartItems.push(cart);
                return {
                    ...state,
                    loading: false,
                    message: 'Item(s) has been successfully added to cart'
                }
            }
        }

        case actionTypes.REMOVE_CART_ITEM: {
            const filteredCart = state.cartItems.filter((item) => {
                return item._id !== action.payload
            });

            return {
                ...state,
                cartItems: filteredCart
            }
        }
        default:
            return state;
    }
};

export default cartReducer;
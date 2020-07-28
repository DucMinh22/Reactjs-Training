import { REMOVE_ALL_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART } from "../action/actionTypes";

const initialState = {
    cartProducts: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_ALL_PRODUCTS:
            return {
                ...state,
                cartProducts: []
            }
        case ADD_TO_CART:
            const newCart = [...state.cartProducts, action.product];
            return {
                ...state,
                cartProducts: newCart
            }
        case REMOVE_FROM_CART:
            console.log('productId', action.productId)
            const cart = [...state.cartProducts].filter(product => product.id !== action.productId);
            return {
                ...state,
                cartProducts: cart
            }
        default:
            return state;
    }
}

export default cartReducer;
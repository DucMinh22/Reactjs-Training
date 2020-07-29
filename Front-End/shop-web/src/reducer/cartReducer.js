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
            const index = state.cartProducts.indexOf(action.product);
            let newCart;
            if (index !== -1) {
                let updateProduct = { ...state.cartProducts[index], quantity: state.cartProducts[index].quantity + action.product.quantity };
                newCart = [...state.cartProducts];
                newCart[index] = updateProduct;
            } else {
                newCart = [...state.cartProducts, action.product];
            }
            return {
                ...state,
                cartProducts: newCart
            }
        case REMOVE_FROM_CART:
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
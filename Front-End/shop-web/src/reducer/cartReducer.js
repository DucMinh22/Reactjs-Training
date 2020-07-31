import {
    REMOVE_ALL_PRODUCTS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    PAY_PRODUCT,
    PAY_ALL_PRODUCTS,
    CONFIRM_PAYMENT,
    PAY_PRODUCT_SUCCESS,
    PAY_PRODUCT_FAILURE,
    PAY_ALL_PRODUCTS_SUCCESS,
    PAY_ALL_PRODUCTS_FAILURE,
    CONFIRM_PAYMENT_FAILURE,
    CONFIRM_PAYMENT_SUCCESS,
    UPDATE_CART_PRODUCT
} from "../action/actionTypes";
import Cookies from 'js-cookie';

const initialState = {
    cartProducts: JSON.parse(localStorage.getItem('cart')) || [],
    purchaseProducts: JSON.parse(localStorage.getItem('purchase')) || [],
    loading: false,
    error: ""
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_ALL_PRODUCTS:
            localStorage.setItem('cart', '[]');
            return {
                ...state,
                cartProducts: []
            }
        case ADD_TO_CART:
            const arrCartProductId = state.cartProducts.map(item => item.id);
            const index = arrCartProductId.indexOf(action.product.id);
            let newCart;
            if (index !== -1) {
                let updateProduct = { ...state.cartProducts[index], quantity: state.cartProducts[index].quantity + action.product.quantity };
                newCart = [...state.cartProducts];
                newCart[index] = updateProduct;
            } else {
                newCart = [...state.cartProducts, action.product];
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            return {
                ...state,
                cartProducts: newCart
            }
        case REMOVE_FROM_CART:
            const cart = [...state.cartProducts].filter(product => product.id !== action.productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            return {
                ...state,
                cartProducts: cart
            }
        case UPDATE_CART_PRODUCT:
            const arrCartProductIds = state.cartProducts.map(item => item.id);
            const idx = arrCartProductIds.indexOf(action.product.id);
            let updateCart = [...state.cartProducts]
            updateCart[idx] = action.product;
            localStorage.setItem('cart', JSON.stringify(updateCart));
            return {
                ...state,
                cartProducts: updateCart
            }
        case PAY_PRODUCT:
            return {
                ...state,
                loading: true,
            }

        case PAY_PRODUCT_SUCCESS:
            const purchaseCart = [...state.purchaseProducts, action.payload];
            const cartAfterPurchase = [...state.cartProducts].filter(product => product.id !== action.payload.id);
            localStorage.setItem('cart', JSON.stringify(cartAfterPurchase));
            localStorage.setItem('purchase', JSON.stringify(purchaseCart));
            return {
                ...state,
                loading: false,
                purchaseProducts: purchaseCart,
                cartProducts: cartAfterPurchase
            }
        case PAY_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case PAY_ALL_PRODUCTS:
            return {
                ...state,
                loading: true,
            }
        case PAY_ALL_PRODUCTS_SUCCESS:
            localStorage.setItem('cart', "[]");
            localStorage.setItem('purchase', JSON.stringify(action.payload));
            return {
                ...state,
                cartProducts: [],
                purchaseProducts: action.payload,
                loading: false
            }
        case PAY_ALL_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CONFIRM_PAYMENT:
            return {
                ...state,
                loading: true
            }
        case CONFIRM_PAYMENT_SUCCESS:
            localStorage.setItem('purchase', "[]");
            Cookies.remove('billId');
            return {
                ...state,
                purchaseProducts: [],
                loading: false
            }
        case CONFIRM_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;
import { REMOVE_ALL_PRODUCTS } from "../action/constant";

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
        default:
            return state;
    }
}

export default cartReducer;
import { GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAILURE, GET_INFO_PRODUCTS } from "../action/constant";

const initialState = {
    products: [],
    loading: false,
    error: "",
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case GET_ALL_PRODUCTS:
        //     return {
        //         ...state,
        //         loading: true,
        //     }
        // case GET_ALL_PRODUCTS_SUCCESS:
        //     return {
        //         ...state,
        //         products: action.payload,
        //         loading: false,
        //     }
        // case GET_ALL_PRODUCTS_FAILURE:
        //     return {
        //         ...state,
        //         error: action.payload,
        //         loading: false,
        //     }
            case GET_INFO_PRODUCTS:
                console.log(action.a);
                return{
                ...state, 
                products: action.a,
                }
        default:
            return state;
    }
}

export default productsReducer;
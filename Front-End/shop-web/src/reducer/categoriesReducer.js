import {
    GET_ALL_CATEGORIES,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAILURE,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_BY_CATEGORY_FAILURE,
    GET_PRODUCTS_BY_CATEGORY_SUCCESS
} from "../action/actionTypes";

const initialState = {
    loading: false,
    error: "",
    categories: [],
    products: [],
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false,
            }
        case GET_ALL_CATEGORIES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case GET_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                products: [],
                loading: true,
            }
        case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            }
        case GET_PRODUCTS_BY_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}

export default categoriesReducer;
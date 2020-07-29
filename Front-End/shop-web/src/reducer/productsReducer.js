import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_INFO_PRODUCTS,
  SEARCH_PRODUCT_ITEM,
} from "../action/actionTypes";

const initialState = {
  products: [],
  loading: false,
  error: "",
  searchProducts: [],
};

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
      return {
        ...state,
        products: action.a,
      };

    case SEARCH_PRODUCT_ITEM:
      return {
        ...state,
        searchProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;

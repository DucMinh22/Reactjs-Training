import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_INFO_PRODUCTS,
  SEARCH_PRODUCT_ITEM,
  GET_ALL_BILLS,
  GET_PRODUCTS_BILL,
  GET_STATE_BILLS,
  REMOVE_BILLS,
  SEARCH_BILLS,
  UPDATE_STATE_BILLS,
} from "../action/actionTypes";

const initialState = {
  products: [],
  loading: false,
  error: "",
  searchProducts: [],
  bills: [],
  productsbill: {},
  stateBills: [],
  searchbills: [],
  updateStateBills: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
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
    case GET_ALL_BILLS:
      return {
        ...state,
        bills: action.payload,
      };
    case GET_PRODUCTS_BILL:
      return {
        ...state,
        productsbill: action.payload,
      };
    case GET_STATE_BILLS:
      return {
        ...state,
        stateBills: action.payload,
      };
    case SEARCH_BILLS:
      return {
        ...state,
        searchbills: action.payload,
      };
    case UPDATE_STATE_BILLS:
      return {
        ...state,
        updateStateBills: action.payload,
      };
    case REMOVE_BILLS:
      const prbill = [...state.bills].filter(
        (product) => product.id !== action.BillsId
      );
      return {
        ...state,
        bills: prbill,
      };
    default:
      return state;
  }
};

export default productsReducer;

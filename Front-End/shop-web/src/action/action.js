import {
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  GET_PRODUCTS_BY_CATEGORY,
  GET_INFO_PRODUCTS,
  REMOVE_ALL_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SEARCH_PRODUCT_ITEM,
} from "./actionTypes";

export const getAllProducts = () => {
  return {
    type: GET_ALL_PRODUCTS,
  };
};

export const getAllCategories = () => {
  return {
    type: GET_ALL_CATEGORIES,
  };
};

export const getProductsByCategory = (categoryId) => {
  return {
    type: GET_PRODUCTS_BY_CATEGORY,
    categoryId,
  };
};

export const getInfoProducts = (products) => {
  return {
    type: GET_INFO_PRODUCTS,
    a: products,
  };
};

export const removeAllCartProducts = () => {
  return {
    type: REMOVE_ALL_PRODUCTS,
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    productId,
  };
};

export const searchProduct = (product) => {
  return {
    type: SEARCH_PRODUCT_ITEM,
    payload: product,
  };
};

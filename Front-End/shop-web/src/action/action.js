import { GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, GET_PRODUCTS_BY_CATEGORY, GET_INFO_PRODUCTS } from "./constant"

export const getAllProducts = () => {
    return {
        type: GET_ALL_PRODUCTS
    }
}

export const getAllCategories = () => {
    return {
        type: GET_ALL_CATEGORIES
    }
}

export const getProductsByCategory = (categoryId) => {
    return {
        type: GET_PRODUCTS_BY_CATEGORY,
        categoryId
    }
}

export const getInfoProducts = (products) => {
    return {
        type: GET_INFO_PRODUCTS,
        a: products,
    }
}


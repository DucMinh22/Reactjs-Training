import { GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, GET_PRODUCTS_BY_CATEGORY } from "./constant"

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
    console.log('categoryId', categoryId)
    return {
        type: GET_PRODUCTS_BY_CATEGORY,
        categoryId
    }
}
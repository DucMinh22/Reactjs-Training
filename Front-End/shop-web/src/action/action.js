import { GET_ALL_PRODUCTS, GET_INFO_PRODUCTS } from "./constant"

export const getAllProducts = () => {
    return {
        type: GET_ALL_PRODUCTS
    }
}
export const getInfoProducts = (products) =>{
    return{
        type: GET_INFO_PRODUCTS,
        a: products,
    }
}


import { takeLatest, all, call, put } from "redux-saga/effects";
import { GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_FAILURE, GET_ALL_CATEGORIES_SUCCESS, GET_PRODUCTS_BY_CATEGORY_SUCCESS, GET_PRODUCTS_BY_CATEGORY_FAILURE, GET_PRODUCTS_BY_CATEGORY } from "../action/actionTypes";
import axiosService from "../utils/axiosService";
import { ENDPOINT, GET_CATEGORIES_API } from "../constant";

function* getCategories() {
    try {
        const res = yield call(() => axiosService.get(`${ENDPOINT}${GET_CATEGORIES_API}`));
        if (res.data?.length > 0) {
            yield put({ type: GET_ALL_CATEGORIES_SUCCESS, payload: res.data });
        } else {
            yield put({ type: GET_ALL_CATEGORIES_FAILURE, payload: 'No data' });
        }
    } catch (error) {
        yield put({ type: GET_ALL_CATEGORIES_FAILURE, payload: "Server Error" });
    }
}

function* getProductsByCategory(action) {
    const { categoryId, option } = action;
    let res;
    try {
        if (option.order?.length > 0 && option.sortBy?.length > 0) {
            res = yield call(() => axiosService.get(`${ENDPOINT}${GET_CATEGORIES_API}/${categoryId}/products?sortBy=${option.sortBy}&order=${option.order || 'desc'}`));
        } else {
            res = yield call(() => axiosService.get(`${ENDPOINT}${GET_CATEGORIES_API}/${categoryId}/products?page=${option.page}&limit=6`));
        }
        if (res.data?.length > 0) {
            yield put({ type: GET_PRODUCTS_BY_CATEGORY_SUCCESS, payload: res.data });
        } else {
            yield put({ type: GET_PRODUCTS_BY_CATEGORY_FAILURE, payload: 'No data' });
        }
    } catch (error) {
        yield put({ type: GET_PRODUCTS_BY_CATEGORY_FAILURE, payload: "Server Error" });
    }
}

export default function* categoryWatcher() {
    yield all([
        takeLatest(GET_ALL_CATEGORIES, getCategories),
        takeLatest(GET_PRODUCTS_BY_CATEGORY, getProductsByCategory),
    ])
}
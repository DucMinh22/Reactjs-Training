import { all, takeLatest, call, put } from "redux-saga/effects";
import { GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAILURE } from '../action/constant'
import axiosService from "../utils/axiosService";


function* getProducts() {
    try {
        const res = yield call(() => axiosService.get(`https://5c6521b719df280014b6267d.mockapi.io/api/products`));
        if (res.data?.length > 0) {
            yield put({ type: GET_ALL_PRODUCTS_SUCCESS, payload: res.data });
        } else {
            yield put({ type: GET_ALL_PRODUCTS_FAILURE, payload: "No Data" });
        }
    } catch (error) {
        yield put({ type: GET_ALL_PRODUCTS_FAILURE, payload: "Server Error" });
    }
}

export default function* productWatcher() {
    yield all([
        takeLatest(GET_ALL_PRODUCTS, getProducts)
    ])
}
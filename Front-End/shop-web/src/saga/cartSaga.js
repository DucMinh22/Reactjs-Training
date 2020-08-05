import { all, takeLatest, call, put, select } from "redux-saga/effects";
import axiosService from "../utils/axiosService";
import { ENDPOINT, GET_BILL_API } from "../constant";
import { PAY_PRODUCT, PAY_PRODUCT_FAILURE, PAY_PRODUCT_SUCCESS, PAY_ALL_PRODUCTS_SUCCESS, PAY_ALL_PRODUCTS_FAILURE, PAY_ALL_PRODUCTS, CONFIRM_PAYMENT_SUCCESS, CONFIRM_PAYMENT_FAILURE, CONFIRM_PAYMENT } from "../action/actionTypes";
import Cookies from 'js-cookie';

function* purchaseProduct(action) {
    const { product } = action;
    const newProduct = { ...product, status: 'shipping' };
    const name = Cookies.get("name");
    let purchaseCart = yield select(state => state.cart.purchaseProducts);
    const body = {
        username: name,
        bills: [
            newProduct,
            ...purchaseCart
        ],
        status: "shipping"
    }
    const billId = Cookies.get('billId');
    try {
        let res
        if (!billId) {
            res = yield call(() => axiosService.post(`${ENDPOINT}${GET_BILL_API}`, body))
        } else {
            res = yield call(() => axiosService.put(`${ENDPOINT}${GET_BILL_API}/${billId}`, body))
        }
        if (res.status === 201 || res.status === 200) {
            Cookies.set('billId', res.data.id, { expires: 1 });
            yield put({ type: PAY_PRODUCT_SUCCESS, payload: newProduct });
        } else {
            yield put({ type: PAY_PRODUCT_FAILURE, payload: 'Create Failed' });
        }
    } catch (error) {
        yield put({ type: PAY_PRODUCT_FAILURE, payload: 'Server Error' });
    }
}

function* purchaseAll() {
    let cartItems = yield select(state => state.cart.cartProducts);
    const updateCart = cartItems.map(item => {
        return {
            ...item,
            status: 'shipping'
        }
    })
    let purchaseItems = yield select(state => state.cart.purchaseProducts);
    const name = Cookies.get("name");
    const body = {
        username: name,
        bills: [...updateCart, ...purchaseItems],
        status: "shipping"
    }
    const billId = Cookies.get('billId');
    try {
        let res;
        if (!billId) {
            res = yield call(() => axiosService.post(`${ENDPOINT}${GET_BILL_API}`, body))
        } else {
            res = yield call(() => axiosService.put(`${ENDPOINT}${GET_BILL_API}/${billId}`, body))
        }

        if (res.status === 201 || res.status === 200) {
            Cookies.set('billId', res.data.id, { expires: 1 });
            yield put({ type: PAY_ALL_PRODUCTS_SUCCESS, payload: body.bills });
        } else {
            yield put({ type: PAY_ALL_PRODUCTS_FAILURE, payload: 'Create Failed' });
        }
    } catch (error) {
        yield put({ type: PAY_ALL_PRODUCTS, payload: 'Server Error' });
    }
}

function* confirmPayment() {
    let purchaseItems = yield select(state => state.cart.purchaseProducts);
    const name = Cookies.get("name");
    let body = {
        usename: name,
        bills: [...purchaseItems],
        status: "done"
    }
    const billId = Cookies.get('billId');
    try {
        let res = yield call(() => axiosService.put(`${ENDPOINT}${GET_BILL_API}/${billId}`, body))
        if (res.status === 201 || res.status === 200) {
            Cookies.remove('billId');
            yield put({ type: CONFIRM_PAYMENT_SUCCESS });
        } else {
            yield put({ type: CONFIRM_PAYMENT_FAILURE, payload: 'Create Failed' });
        }
    } catch (error) {
        yield put({ type: CONFIRM_PAYMENT_FAILURE, payload: 'Server Error' });
    }
}

export default function* cartWatcher() {
    yield all([
        takeLatest(PAY_PRODUCT, purchaseProduct),
        takeLatest(PAY_ALL_PRODUCTS, purchaseAll),
        takeLatest(CONFIRM_PAYMENT, confirmPayment)
    ])
}
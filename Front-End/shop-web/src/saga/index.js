import { fork, all } from 'redux-saga/effects'
import productWatcher from './productSaga'

export default function* rootSaga() {
    console.log(`rootSaga`)
    yield all([
        productWatcher(),
    ])
}

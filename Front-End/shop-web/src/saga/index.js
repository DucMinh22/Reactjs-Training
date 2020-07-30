import { all, fork } from 'redux-saga/effects'
import productWatcher from './productSaga'
import categoryWatcher from './categorySaga'

export default function* rootSaga() {
    yield all([
        fork(productWatcher),
        fork(categoryWatcher),
    ])

}

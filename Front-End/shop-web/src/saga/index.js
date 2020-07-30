import { all, fork } from 'redux-saga/effects'
import productWatcher from './productSaga'
import categoryWatcher from './categorySaga'
import cartWatcher from './cartSaga'

export default function* rootSaga() {
    yield all([
        fork(productWatcher),
        fork(categoryWatcher),
        fork(cartWatcher)
    ])

}

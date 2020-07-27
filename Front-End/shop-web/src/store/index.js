import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducer';
import rootSaga from '../saga';

const sagaMiddleware = createSagaMiddleware();

//using Redux DevTools to see what’s going on under the hood in our store
const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools),
);

sagaMiddleware.run(rootSaga);

export default store;
import { createStore, compose } from 'redux';
import rootReducer from '../reducer';

//using Redux DevTools to see what’s going on under the hood in our store
const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
    rootReducer,
    compose(reduxDevTools)
);

export default store;
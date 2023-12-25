// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Tạo reducer sau

const store = createStore(rootReducer);

export default store;

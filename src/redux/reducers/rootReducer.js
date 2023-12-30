// redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import modalReducer from './modalReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  theme: themeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

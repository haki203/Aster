// reducers/index.js
import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  modal: modalReducer,
  // Add other reducers if needed
});

export default rootReducer;

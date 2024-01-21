// reducers/themeReducer.js
import { StatusBar, Platform } from 'react-native';

const initialState = {
    isDarkMode: false,
    stBarHeight:Platform.OS === 'android' ? StatusBar.currentHeight : 0
  };
  
  const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return {
          ...state,
          isDarkMode: !state.isDarkMode,
        };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  
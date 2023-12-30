// redux/reducers/modalReducer.js
const initialState = {
    isModalVisible: false,
  };
  
  const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_MODAL':
        return { ...state, isModalVisible: true };
      case 'HIDE_MODAL':
        console.log('hide');
        return { ...state, isModalVisible: false };
      default:
        return state;
    }
  };
  
  export default modalReducer;
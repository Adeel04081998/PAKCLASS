
import * as actionTypes from '../actions/actionTypes';



export default  (state = {  }, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_ACTION:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};
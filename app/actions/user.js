import * as actionTypes from './actionTypes';


export const setUserAction = (payload = {}) => {
    // console.log("payload",payload);
    return {
        type: actionTypes.SET_USER_ACTION,
        payload: { ...payload }
    }
}




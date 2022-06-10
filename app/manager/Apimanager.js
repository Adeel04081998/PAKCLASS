import React from 'react';
import Axios from './Axios';



export const postRequest = async (url, data, onSuccess = () => { }, onError = () => { }, headers = {},) => {
    console.log("data=>>>", data);
    // debugger


    try {
        // console.log("url=>>>", url);
        // let res = await Axios.post(url, data, headers)
        let res = await Axios.post(url, data, headers,);
// debugger 
        console.log("[ApiManager].postRequest.res", JSON.stringify(res.data));

        onSuccess(res);

    } catch (error) {
        // console.log("[ApiManager].postRequest.error", error);
        onError(error)

    } finally {

    }
};
export const getRequest = async (url, onSuccess = () => { }, onError = () => { }, headers = {}, showLoader = true) => {
        // console.log("headers", headers, url);
    
    // debugger
    try {

        let res = await Axios.get(url, headers);
        // console.log("[ApiManager].getRequest.res", JSON.stringify(res));

        onSuccess(res);
    } catch (error) {
        // console.log("[ApiManager].getRequest.error", error);
        onError(error)

    }
};

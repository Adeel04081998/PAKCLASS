import React from 'react';
import Axios from './Axios';
import GV from '../../app/utils/GV'
import { store } from '../store';



export const postRequest = async (url, data, onSuccess = () => { }, onError = () => { }, headers = {},) => {
    try {
        let res = await Axios.post(url, data, headers,);
        console.log("data=>>>>.", res);

        onSuccess(res);

    } catch (error) {
        console.log("data=>>>>.errr", error);
        onError(error)

    } 
};
export const getRequest = async (url, onSuccess = () => { }, onError = () => { }, headers = {}, showLoader = true) => {
    try {

        let res = await Axios.get(url, headers);
        onSuccess(res);
    } catch (error) {
        onError(error)

    }
};

export const multipartPostRequest = (url, formData, onSuccess = (res) => { }, onError = (err) => { }, showLoader = false, header = {}) => {
    console.log("formData",formData);

    const userReducer = store.getState().userReducer;
    // const token = userReducer?.access_token ?? ''
    if (userReducer?.access_token !== '') {
        console.log("hy==>>>>.");
        fetch(`${GV.BASE_URL.current}/${url}`, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userReducer?.access_token}`
            },
            body: formData
        })
            .then((res) => { 
                console.log("res==>>> multi",res );
                return res.json(); })
            .then((data) => { 
                console.log("data",data);
                onSuccess(data) })
            .catch(err => { 
                console.log("err multi",err);
                
                onError(err) })
    }
}
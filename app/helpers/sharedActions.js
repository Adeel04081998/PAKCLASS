
import React from 'react';
import Toast from '../components/Toast/Toast';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { postRequest } from '../manager/Apimanager';
import Endpoints from '../manager/Endpoints';
import { useSelector } from 'react-redux';


export const sharedExceptionHandler = (err, skipToast = false) => {

    if (err) {
        if (err.failed && typeof err.failed === "object") {
            var errorKeys = Object.keys(err.failed)
            errorStr = "";
            for (let index = 0; index < errorKeys.length; index++) {
                if (index >= 0) { errorStr += err.failed[errorKeys[index]][0] }
                else { errorStr += err.failed[errorKeys[index]][0] }
            }
            Toast.error(errorStr);
            return errorStr;
        }
    }
}

export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    // console.log("image REsult", result);

    if (!result.cancelled) { setImage(result.uri); }
};


export const sharedLaunchCameraorGallery = async (pressType, cb, next, option = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true
}) => {
    try {
        const { status, granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (pressType === 1) {
            const { status, granted } = await ImagePicker.requestCameraPermissionsAsync();
            if (status === 'granted' && granted === true) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                cb(result)
            }
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            cb(result)


        }
    } catch (error) { console.log('Catch error :', error) }
}

export const sharedMakeAddFavourite = (postId) => {

    console.log("postID=>>", postId);

    postRequest(Endpoints.Make_Favourite_Ads, {
        'post_id': postId,

    }, (res) => {
        console.log('if signin==============  res', JSON.stringify(res.data));
        if (res.data.status === 'success') {
            Toast.info(res?.data?.message)

        }


    }, err => {

        console.log('if sign_IN error=>>>>>>>>>>>>>>>>', err);
    }, {}, false);


}


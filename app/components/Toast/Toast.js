import React from 'react'
import Toast from 'react-native-toast-message';


export default {
    success: (message, visibilityTime = 3000, position = "top", autoHide = true, onShow = () => { }, onHide = () => { }, onPress = () => { }) => {
        Toast.show({
            type: "success",
            // text1: 'Success',
            text2: message,
            position,
            visibilityTime,
            autoHide,
            onHide,
            onPress,
            onShow,
        });
    },
    info: (message, visibilityTime = 3000, position = "top", autoHide = true, onShow = () => { }, onHide = () => { }, onPress = () => { }) => {
        Toast.show({
            type: "info",
            // text1: 'Info',
            text2: message,
            position,
            visibilityTime,
            autoHide,
            onHide,
            onPress,
            onShow,
        });
    },
    error: (message, visibilityTime = 3000, position = "top", autoHide = true, onShow = () => { }, onHide = () => { }, onPress = () => { }) => {
        Toast.show({
            type: "error",
            // text1: 'Error',
            text2: message,
            position,
            visibilityTime,
            autoHide,
            onHide,
            onPress,
            onShow,

        });
    },
    warning: (message, visibilityTime = 3000, position = "top", autoHide = true, onShow = () => { }, onHide = () => { }, onPress = () => { }) => {
        Toast.show({
            type: "warning",
            // text1: 'warning',
            text2: message,
            position,
            visibilityTime,
            autoHide,
            onHide,
            onPress,
            onShow,

        });
    },
}

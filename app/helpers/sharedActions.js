
import React from 'react';
import Toast from '../components/Toast/Toast';

export const sharedExceptionHandler = (err, skipToast = false) => {
    // console.log("[sharedExceptionHandler].err", err);

    if (err) {
        if (err.failed && typeof err.failed === "object") {
            var errorKeys = Object.keys(err.failed)
            // console.log("errorKeys----------------------", errorKeys);
            errorStr = "";
            for (let index = 0; index < errorKeys.length; index++) {
                if (index >= 0) {
                    errorStr += err.failed[errorKeys[index]][0] 
                }
                else {
                    errorStr += err.failed[errorKeys[index]][0]
                }
            }
            Toast.error(errorStr);
            return errorStr;
        }

       
    }
}
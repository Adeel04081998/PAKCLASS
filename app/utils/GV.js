import React from "react";

let default_Url ='https://pakclass.com'
let initUrlRef = React.createRef(null);
initUrlRef.current = __DEV__ ? default_Url : default_Url;


export default {
    BASE_URL: initUrlRef,
} 

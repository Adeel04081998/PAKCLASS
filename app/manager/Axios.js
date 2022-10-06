import Axios from "axios";
import { useSelector } from "react-redux";
import GV from "../utils/GV";

import { store } from "../store";
let default_Url = 'https://pakclass.com'
Axios.interceptors.request.use((config) => {
    // console.log("config=>>>>>.", config.auth);

    try {

        config.baseURL = 'https://pakclass.com'

        // const userReducer = useSelector(state => state.userReducer)
        const userReducer = store.getState().userReducer;
        const token = userReducer.access_token ?? ''
        console.log('tokentokentokentokentoken ', userReducer);
        if (userReducer.access_token) {
            // config.auth['bearer'] = token
            config.headers.Authorization = `Bearer ${userReducer.access_token ?? ''}`;
            // config.headers.common['Authorization'] = `Bearer ${userReducer.access_token ?? ''}`;


        }

        // console.log('axios=>>>>userReducer', userReducer);
        // const token  = userReducer.


        return config;

    } catch (error) {

    }
    finally {
        // console.log("[axios].config", config)


        return config;
    }

})
Axios.interceptors.response.use(
    async (response) => {
        // console.log("[axios].response", response)
        try {

        }
        catch (error) {
            // console.log("[axios].response.catch.error", error)
        }
        finally {
            return response
        }
    },
    async (error) => {
        try {

        } catch (error) {
            // console.log("[axios].response.error.catch.error", error)

        } finally {
            return Promise.reject(error.response ? error.response : error);
        }
    });

export default Axios
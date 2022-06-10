import Axios from "axios";
import { useSelector } from "react-redux";
import GV from "../utils/GV";

import {store} from "../store";
let default_Url = 'https://pakclass.com'
Axios.interceptors.request.use((config) => {
    // console.log("config=>>>>>.", config.auth);

    try {

        config.baseURL = 'https://pakclass.com'

        // const userReducer = useSelector(state => state.userReducer)
        const userReducer =store.getState().userReducer;
        const token = userReducer.access_token ?? ''
        // console.log('tokentokentokentokentoken ',token);
        if (token) {
            // config.auth['bearer'] = token
            config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU4NmY3ODE3MGY3MDk5YWVlZmU0MzAwNWQzZDc0MTE3ZWYwM2Y2NzA3NTU3NmU5OTFjMTdlYjg0MzQ4NTc0YmExMWE4ZGZhNjY4ZjRkY2YwIn0.eyJhdWQiOiIxIiwianRpIjoiNTg2Zjc4MTcwZjcwOTlhZWVmZTQzMDA1ZDNkNzQxMTdlZjAzZjY3MDc1NTc2ZTk5MWMxN2ViODQzNDg1NzRiYTExYThkZmE2NjhmNGRjZjAiLCJpYXQiOjE2NTQ2MDE4ODEsIm5iZiI6MTY1NDYwMTg4MSwiZXhwIjoxNjg2MTM3ODgxLCJzdWIiOiIxMyIsInNjb3BlcyI6W119.tCuoVuaFDpU0zfghUdsMfEp-Sf1qjtfRI5KuG0AL6F14Gvaz2fhl5TMdnO4APXljRq_E7ttq-WQ0fAze-VM6EHiyvHel1Ht3iPREnddx_qFWS0Iz8cjiaDQS-knYtFP3woIHflX203qzwzJAtGrwemP5TnUUPZXn5j6xvVC-D25wEewhjVFfpnlVpdt38TDlWwQMZim8pGgCktQn1QzylPDcZ8bkQOAsze7JOfM_XyF7hSAdDw_LoOS-3xSAIcfIyioxyuFcCagTrj_BjCU45bIZ7LMPFkjq8i45Rvu4n4WV9B7OKMrTD5t2P2Q-seiHbTU11zkxfCqUYdpe9EU8ib3sEk8rCEZpcqK1R7Q-zIZftZnDaSiATE2kFR5Pn0lAjm2arZVWbqoA5PLxS4WT8VB2OSZBghVvVNDmptIAo8rCaBpg0jCdSaJWVdiZUbTRA7w0jR-havBK-_SCTJDMn-oxRacMD3kyq6W9HrFhEPOTrOE-Novq-7DeUgy_q9lyZ1Wk0mi8Q8b5d90vLc88zf4zxynMJo1fNYisXjlmr11tQmFVggjw1rk_AhGLuiyxmOFHgbf2SOzRyzN9AUX82s0TUH_25il9aKI4PkIy-do1HkkGf9n5pC7YxE5ZGsZxjbZ1vkUY2WJYKzHZwIfmedhA_K9nCn9OsffOgFaETpA`;
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
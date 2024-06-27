import axios from 'axios';
import { PUBLIC_URLS } from '../constants/public-endpoints';
import Session from './session';
import Notify from '@/utils/notify';

/*Setting up interceptors with axios*/
axios.interceptors.request.use(function (config) {

    config.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (isRequireToken(config.url)) {
        const authToken = Session.get('authToken');

        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }
    }

    return config;


}, function (error) {
    return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {

    // Do something with response data 
    // 200 OR 20*
    // SUCESS: if request by PUT/POST/DELETE
    // SUCESS: and GET request : no notification
    // ERROR: always

    return response;

}, function (error) {

    if (!error.response && error.message === 'Network Error') {
        return Promise.reject("Couldn't connect to server. Please try again later.");
    } else if (error.response && error.response.status === 401) { // Assuming 401 is the unauthorized status
        // Dispatch removeToken action if response status is 401
        // store.dispatch(removeToken());
    } else if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    } else {
        return Promise.reject("Server Connection Failed");
    }
});


export default class HTTP {
    static Request(method, url, data = null) {

        return new Promise((resolve, reject) => {
            const request = {
                method,
                url,
                [method.toUpperCase() === 'GET' ? "params" : "data"]: data,
                headers: {
                    'Content-Type': 'application/json'
                }


            };
            axios(request)
                .then(response => resolve(response))
                .catch(error => {
                    if (error.errors) {
                        // Notify.error(error.errors[0]);
                    } else {
                        // Notify.error(error);
                    }
                    reject(error)
                }
                );
        });
    }
}

function isRequireToken(url) {
    const match = PUBLIC_URLS.filter(u => url.endsWith(u));
    return match.length === 0;
}
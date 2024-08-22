import axios from "axios";
import NProgress from 'nprogress';
import {store} from "../redux/store"
import axiosRetry from 'axios-retry';

NProgress.configure({
    showSpinner: false, // không hiển thị vòng tròn quay
    // easing: 'ease',
    // speed: 500,
    // trickleRate: 0.5,
    // easing:'ease',
    // speed: 200,
    // trickle: true,
    // trickleRate: 0.02,
    trickleSpeed: 100,
})

const instance = axios.create({
    baseURL: 'http://localhost:8081/', // đường link backend mà chúng ta muốn gọi
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // console.log(">>> check store: ", store.getState())
    const access_token = store?.getState()?.user?.account?.access_token // Lấy access_token từ Redux
    config.headers["Authorization"] = `Bearer ${access_token}`;
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx (success) cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    NProgress.done();

    // token expired EC === -999
    // if(error.response.data && error.response.data.EC === -999){
    //     window.location.href = '/login'
    // }

    if (error.response?.data?.EC === -999) {
        // Handle token expiration logic here, e.g., refreshing the token
        // and retrying the original request.

        // Assuming we have a function `refreshToken` that refreshes the token:
        return refreshToken().then(newToken => {
            // Update the token in the Redux store
            store.dispatch({ type: 'UPDATE_TOKEN', payload: newToken });

            // Update the request with the new token and retry it
            error.config.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(error.config);
        }).catch(refreshError => {
            window.location.href = '/login';
            return Promise.reject(refreshError);
        });
    }

    // Any status codes that falls outside the range of 2xx (success) cause this function to trigger
    // Do something with response error
    // console.log('>>> run error: ', error.response)
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

// Set up axios-retry to automatically retry requests
axiosRetry(instance, {
    retries: 3, // Number of retry attempts
    retryCondition: (error) => {
        // Retry only on network errors or 5xx server errors
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 500;
    },
    retryDelay: (retryCount) => {
        return retryCount * 1000; // Time between retries in ms (e.g., 1s, 2s, 3s)
    },
});

export default instance



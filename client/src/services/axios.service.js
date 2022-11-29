import axios from "axios";

import baseURL, {urls} from "../configs/urls";

const axiosService = axios.create({withCredentials: true, baseURL});
const authAxiosService = axios.create({withCredentials: true, baseURL});

authAxiosService.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
})

authAxiosService.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axiosService.get(baseURL + urls.refresh);
            localStorage.setItem('access_token', response.data.access_token);

            return authAxiosService.request(originalRequest);
        } catch (e) {
            console.log('Unauthorized');
        }
    }
    throw error;
})

export {axiosService, authAxiosService};
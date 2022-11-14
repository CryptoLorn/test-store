import axios from "axios";

import baseURL from "../configs/urls";

const axiosService = axios.create({baseURL});
const authAxiosService = axios.create({baseURL});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
}

authAxiosService.interceptors.request.use(authInterceptor);

export {axiosService, authAxiosService};
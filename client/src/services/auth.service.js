import {axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const authService = {
    sendEmail: (email) => axiosService.post(urls.forgotPassword, email),
    restorePassword: (password, token) => {
        axiosService.interceptors.request.use((config) => {
            config.headers.Authorization = token;
            return config;
        })
        return axiosService.put(urls.forgotPassword, {password});
    }
}
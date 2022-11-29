import jwt_decode from "jwt-decode";

import {authAxiosService, axiosService} from "./axios.service";
import baseURL, {urls} from "../configs/urls";
import {Role} from "../enum/enum";

export const userService = {
    login: (email, password) => axiosService.post(urls.login, {email, password}).then(value => {
            localStorage.setItem('access_token', value.data.access_token);
            return jwt_decode(value.data.access_token);
        }
    ),
    registration: (email, password) => axiosService.post(urls.registration, {email, password, role: Role.USER}).then(value => {
            localStorage.setItem('access_token', value.data.access_token);
            return jwt_decode(value.data.access_token);
        }
    ),
    logout: () => axiosService.post(urls.logout).then(value => localStorage.removeItem('access_token')),
    checkIsAuth: () => axiosService.get(baseURL + urls.refresh).then(value => {
        localStorage.setItem('access_token', value.data.access_token);
        return value;
    }),
    getAll: (id) => authAxiosService.get(`${urls.users}/${id}`).then(value => value.data),
    updateById: (id, user) => authAxiosService.put(`${urls.users}/${id}`, user).then(value => value.data)
}
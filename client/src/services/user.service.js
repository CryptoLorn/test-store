import jwt_decode from "jwt-decode";

import {authAxiosService, axiosService} from "./axios.service";
import {urls} from "../configs/urls";
import {Role} from "../enum/enum";

export const userService = {
    login: (email, password) => axiosService.post(urls.login, {email, password}).then(value => {
            localStorage.setItem('token', value.data.token);
            return jwt_decode(value.data.token);
        }
    ),
    registration: (email, password) => axiosService.post(urls.registration, {email, password, role: Role.USER}).then(value => {
        localStorage.setItem('token', value.data.token);
        return jwt_decode(value.data.token);
    }),
    checkIsAuth: () => authAxiosService.get(urls.auth).then(value => {
        localStorage.setItem('token', value.data.token);
        return jwt_decode(value.data.token);
    }),
    getAll: (id) => authAxiosService.get(`${urls.users}/${id}`).then(value => value.data),
    updateById: (id, user) => authAxiosService.put(`${urls.users}/${id}`, user).then(value => value.data)
}
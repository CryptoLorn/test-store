import jwt_decode from "jwt-decode"

import {authAxiosService, axiosService} from "./axios.service";

export const registration = async (email, password) => {
    const {data} = await axiosService.post('api/user/registration', {email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await axiosService.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const checkIsAuth = async () => {
    const {data} = await authAxiosService.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
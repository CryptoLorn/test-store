import {authAxiosService, axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const typeService = {
    create: (type) => authAxiosService.post(urls.type, type).then(value => value.data),
    getAll: () => axiosService.get(urls.type).then(value => value.data)
}
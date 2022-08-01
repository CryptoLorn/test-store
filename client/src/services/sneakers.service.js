import {authAxiosService, axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const sneakersService = {
    create: (sneaker) => authAxiosService.post(urls.sneaker, sneaker).then(value => value.data),
    getAll: (typeId, brandId, page, limit = 5) => axiosService.get(urls.sneaker).then(value => value.data),
    getById: (id) => axiosService.get(`${urls.sneaker}/${id}`).then(value => value.data)
}
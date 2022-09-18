import {authAxiosService, axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const sneakersService = {
    create: (sneakers) => authAxiosService.post(urls.sneakers, sneakers).then(value => value.data),
    getAll: (typeId, brandId, page) => axiosService.get(urls.sneakers, {params: {typeId, brandId, page}}).then(value => value.data),
    getById: (id) => axiosService.get(`${urls.sneakers}/${id}`).then(value => value.data),
    deleteById: (id) => authAxiosService.delete(`${urls.sneakers}/${id}`),
    getAllFromSearch: () => axiosService.get(urls.search).then(value => value.data),
    updateById: (id, sneaker) => authAxiosService.put(`${urls.sneakers}/${id}`, sneaker).then(value => value.data)
}
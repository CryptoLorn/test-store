import {axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const sneakersService = {
    getAll: () => axiosService.get(urls.sneaker).then(value => value.data),
    getById: (id) => axiosService.get(`${urls.sneaker}/${id}`).then(value => value.data)
}
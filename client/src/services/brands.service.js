import {axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const brandsService = {
    getAll: () => axiosService.get(urls.brand).then(value => value.data),
    getById: (id) => axiosService.get(`${urls.brand}/${id}`).then(value => value.data)
}
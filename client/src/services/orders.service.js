import {axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const ordersService = {
    create: (orders) => axiosService.post(urls.orders, orders).then(value => value.data),
    getAllById: (basketId) => axiosService.get(urls.orders, {params: {basketId}}).then(value => value.data),
    deleteById: (id) => axiosService.delete(`${urls.orders}/${id}`)
}
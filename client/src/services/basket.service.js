import {axiosService} from "./axios.service";

import {urls} from "../configs/urls";

export const basketService = {
    getAll: () => axiosService.get(urls.basket).then(value => value.data)
}
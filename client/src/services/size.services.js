import {axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const sizesService = {
    getAll: () => axiosService.get(urls.sizes).then(value => value.data)
}
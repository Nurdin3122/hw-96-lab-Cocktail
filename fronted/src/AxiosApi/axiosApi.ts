import axios from 'axios';
import { apiURL } from "./baseUrl";

const axiosApi = axios.create({
    baseURL: apiURL
});
export default axiosApi;
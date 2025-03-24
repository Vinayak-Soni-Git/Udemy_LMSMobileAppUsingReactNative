import axios from 'axios'
import {API_BASE_URL} from "./Constants";

const apiInstance = axios.create({
    baseURL:API_BASE_URL,
    timeout:50000,
    headers:{
        'Content-Type': 'application/json',
        Accept:'Application/json'
    }
})

export default apiInstance


import axios from "axios";


export const axiosServerInstance = axios.create({
    baseURL: 'http://localhost:8000'
})


export const axiosBffInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
})


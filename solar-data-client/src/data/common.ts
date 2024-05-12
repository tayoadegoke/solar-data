import axios from "axios";
import { signOut, getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const axiosServerInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})


export const axiosBffInstance = axios.create({
    baseURL: 'http://localhost:8000'
})



axiosBffInstance.interceptors.request.use(async function (req) {

    console.log(req.headers, 'headers session common')
    return req;
}, function (error) {
    console.log({ error })

    return Promise.reject(error);
})

axiosBffInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log({ error })
    if (error.code) {
        // console.log('signing out', error.response.message)
        // signOut()
    }
    return Promise.reject(error);
})
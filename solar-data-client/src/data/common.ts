import axios from "axios";
import { signOut, getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export const axiosBffInstance = axios.create({
    baseURL: 'http://localhost:8000'
})


const MAX_RETRIES = 3;

axiosBffInstance.interceptors.request.use(async function (req) {
    return req;
}, function (error) {
    console.log({ error })

    return Promise.reject(error);
})

axiosBffInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    // Retry logic
    const { config } = error;
    if (!config || !config.__retryCount) {
        config.__retryCount = 0;
    }

    if (config.__retryCount < MAX_RETRIES) {
        config.__retryCount += 1;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(axiosBffInstance(config));
            }, 1000); // Retry after 1 second
        });
    }

    // Handle the final error after retries
    if (error.response && error.response.status === 401) {
        signOut();
    }

    return Promise.reject(error);

})
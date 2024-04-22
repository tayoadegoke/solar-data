import { axiosServerInstance } from "../common"

import { useQuery } from "@tanstack/react-query"


export const registerUser = async (values: any) => {
    try {
        const res = await axiosServerInstance.post('/register', values)
        return res
    } catch (e) {
        return e

    }
}

export const loginUser = async (values: any) => {
    try {
        const res = await axiosServerInstance.post('/login', values)
        return res
    } catch (e) {
        return e
    }
}


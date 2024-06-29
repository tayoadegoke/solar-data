import { axiosBffInstance } from "../common"

import { useQuery } from "@tanstack/react-query"


export const registerUser = async (values: any) => {
    try {
        const res = await axiosBffInstance.post('/register', values)
        return res as any
    } catch (e) {
        return e

    }
}

export const loginUser = async (values: any) => {
    try {
        const res = await axiosBffInstance.post('/login', values)
        return res
    } catch (e) {
        return e
    }
}


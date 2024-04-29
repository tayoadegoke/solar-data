import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { axiosBffInstance } from "../common"


const locationKeys = {
    all: ['locations'],
    id: (id: number) => [...locationKeys.all, id]
}
export const addLocation = async (values: any) => {
    try {
        delete values.isActive
        values.ghi = 0
        const res = await axiosBffInstance.post('/location', values)
        return res
    } catch (e) {
        return e

    }
}

export const getLocations = async () => {
    try {
        const res = await axiosBffInstance.get('/location')
        return res.data
    } catch (e) {

    }
}


export const useLocationsQuery = (enabled: boolean | undefined) => {
    console.log({ enabled })
    return useQuery({ queryKey: ['locations'], queryFn: getLocations, enabled })
}

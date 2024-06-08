import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { axiosBffInstance } from "../common"
import { signOut } from "next-auth/react"

const locationKeys = {
    all: ['locations'],
    id: (id: number) => [...locationKeys.all, id],
}
const moduleKeys = {
    all: ['modules'],
    id: (id: string) => [...moduleKeys.all, id],
}

const systemKeys = {
    all: ['systems'],
    id: (id: string) => [systemKeys.all, id]
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

export const updateSystem = async (values: any) => {
    try {
        const res = await axiosBffInstance.put('/pv_system', values)
        return res
    }
    catch (e) {
        return e
    }
}

export const getLocations = async () => {
    try {
        const res = await axiosBffInstance.get('/location')
        return res.data
    } catch (e) {
        return Promise.reject(new Error(`request failed`))
    }
}

export const getSystems = async (location_id: number) => {
    try {
        //const res = await axiosBffInstance.get(`/pv_system?location_id=${location_id}`)
        const b =
            [
                {
                    "id": 327,
                    "inverter_count": 1,
                    "inverter_id": 1,
                    "inverter_name": "ABB: MICRO-0.25-I-OUTD-US-208 [208V]",
                    "location.optimal_azimuth": 177,
                    "location.optimal_tilt": 40,
                    "location_id": 420,
                    "module_id": 47,
                    "module_name": "Advance Power API-M250",
                    "step": 2,
                    "subarray1_azimuth": null,
                    "subarray1_modules_per_string": null,
                    "subarray1_nstrings": null,
                    "subarray1_tilt": null
                }
            ]
        // return res.data
        return b
    } catch (e) {
        return Promise.reject(new Error(`request failed`))
    }
}

export const getModules = async () => {
    try {
        const res = await axiosBffInstance.get('/pv_system/modules')
        return res.data
    } catch (e) {
        return Promise.reject(new Error(`request failed`))
    }
}

export const getModuleDetail = async (id: string) => {
    try {
        const res = await axiosBffInstance.get(`/pv_system/modules/${id}`)
        return res.data
    } catch (e) {
        return Promise.reject(new Error(`request failed`))
    }
}

//Queries 
export const useLocationsQuery = (enabled: boolean | undefined) => {
    return useQuery({ queryKey: locationKeys.all, queryFn: getLocations, enabled, staleTime: Infinity })
}

export const useSystemsQuery = (location_id: number) => {
    return useQuery({ queryKey: systemKeys.all, queryFn: () => getSystems(location_id), staleTime: Infinity })
}

export const useModulesQuery = (enabled: boolean | undefined) => {
    return useQuery({ queryKey: moduleKeys.all, queryFn: getModules, enabled, staleTime: Infinity })
}


export const useModuleDetailQuery = (id: string) => {
    return useQuery({ queryKey: moduleKeys.id(id), queryFn: () => getModuleDetail(id), enabled: !!id, staleTime: Infinity })
}



//Mutations

import { useMutation, useQuery, UseQueryOptions, QueryClient } from "@tanstack/react-query"
import { axiosBffInstance } from "../common"
import { signOut } from "next-auth/react"
import axios from "axios"
import { Autocomplete } from "@react-google-maps/api"




export const locationKeys = {
    all: ['locations'],
    id: (id: number) => [...locationKeys.all, id],
}
export const moduleKeys = {
    all: ['modules'],
    id: (id: string) => [...moduleKeys.all, id],
}

export const inverterKeys = {
    all: ['inverters'],
    id: (id: string) => [...inverterKeys.all, id]
}

export const systemKeys = {
    all: ['systems'],
    id: (id: string) => [systemKeys.all, id]
}

//Functions
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

export const getMapPredictions = async (location: string) => {
    try {
        // const res = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json
        // ?input=${location}
        // &types=geocode
        // &key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`, {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*', // This is often ignored by browsers
        //         'Content-Type': 'application/json'
        //     }
        // })

        // return res

    } catch (e) {
        return e
    }
}
export const createSystem = async (values: any) => {
    try {
        const res = await axiosBffInstance.post('/pv_system', values)
        return res.data
    }
    catch (e) {
        return e
    }
}
export const updateSystem = async (values: any, id: string) => {
    try {
        const res = await axiosBffInstance.put(`/pv_system/${id}`, values)
        console.log(res, 'res')
        return res
    }
    catch (e) {
        console.log(e, 'err')

        return Promise.reject(new Error(`request failed`))
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
        const res = await axiosBffInstance.get(`/pv_system?location_id=${location_id}`)
        return res.data
    } catch (e) {
        return Promise.reject(new Error(`request failed`))
    }
}

export const getSystemById = async (system_id: string, location_id: string) => {
    try {
        const res = await axiosBffInstance.get(`/pv_system/${system_id}?location_id=${location_id}`)

        return res.data
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

export const getInverters = async () => {
    try {
        const res = await axiosBffInstance.get('/pv_system/inverters')
        return res.data
    } catch (e) {
        return Promise.reject(new Error(`request failed`))
    }
}


//Queries 
export const useLocationsQuery = (enabled: boolean | undefined) => {
    return useQuery({ queryKey: locationKeys.all, queryFn: getLocations, enabled })
}

export const useSystemsQuery = (location_id: number) => {
    return useQuery({ queryKey: [...systemKeys.all, locationKeys.id(location_id)], queryFn: () => getSystems(location_id), enabled: location_id > 0 })
}

export const useSystemsByIdQuery = (system_id: string, location_id: string) => {
    return useQuery({ queryKey: systemKeys.id(system_id), queryFn: () => getSystemById(system_id, location_id) })
}
export const useModulesQuery = (enabled: boolean | undefined) => {
    return useQuery({ queryKey: moduleKeys.all, queryFn: getModules, enabled, staleTime: Infinity })
}

export const useModuleDetailQuery = (id: string) => {
    return useQuery({ queryKey: moduleKeys.id(id), queryFn: () => getModuleDetail(id), enabled: !!id })
}

export const useInvertersQuery = (enabled: boolean | undefined) => {
    return useQuery({ queryKey: inverterKeys.all, queryFn: () => getInverters(), enabled, staleTime: Infinity })
}


//Mutations

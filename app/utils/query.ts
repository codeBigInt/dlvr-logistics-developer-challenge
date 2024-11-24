"use client"
import { useQuery } from "@tanstack/react-query"
import { fetchCompanies, fetchLocations } from "./action"

export const useGetCompanies = () => {
    return useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies,
        refetchOnWindowFocus: false
    })
}


export const useLocationSearch = (watchAddresField: string) => {
    return useQuery({
        enabled: watchAddresField.length >= 3,
        queryKey: ['locations', watchAddresField],
        queryFn: () => fetchLocations(watchAddresField),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
    })
}
"use client"
import { useGetCompanies } from '@/app/utils/query'
import React from 'react'
import MapViewBox from './MapViewBox'

const MapViewGrid = () => {
    const { data: companies, error, isLoading } = useGetCompanies()

    return (
        <div className='flex lg:flex-row flex-col gap-1 w-full h-full bg-white'>
            {
                companies?.map((company) => (
                    <MapViewBox
                        key={company.id}
                        addressInfo={company.address}
                        email={company.email}
                        phone={company.phone}
                        company_name={company.company_name}
                    />
                ))
            }
        </div>
    )
}

export default MapViewGrid

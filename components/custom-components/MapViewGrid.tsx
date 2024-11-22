"use client"
import { useGetCompanies } from '@/app/utils/query'
import React, { useState } from 'react'
import MapViewBox from './MapViewBox'
import { Frown, Loader, MapPinOff } from 'lucide-react'

const MapViewGrid = () => {
    const { data: companies, isLoading, error } = useGetCompanies()
    const [openDetailIndex, setOpenDetailIndex] = useState<number | null>(null)

    const handleToggleDetail = (index: number | null) => {
        setOpenDetailIndex(index)
    }

    return (
        <div className='flex lg:flex-row flex-col gap-1 lg:justify-center md:p-2 rounded-lg w-full h-full bg-transparent'>
            {isLoading ? (
                <div className='flex items-center gap-3 text-white w-full h-full justify-center'>
                    <span><Loader className='animate-spin' /></span>
                    <span>Loading companies</span>
                </div>
            ) : (error ? (
                <div className='flex items-center text-white gap-3 w-full h-full justify-center'>
                    <span><Frown size={20} /></span>
                    <span>Faied to fetch</span>
                </div>
            ) :
                (
                    (companies?.length || 0) > 0? (
                        <div className='flex gap-1 md:flex-row w-full flex-wrap flex-col rounded-lg'>
                            {
                                companies?.map((company, index) => (
                                    <MapViewBox
                                        key={company.id}
                                        addressInfo={company.address}
                                        email={company.email}
                                        phone={company.phone}
                                        index={index}
                                        openDetailIndex={openDetailIndex}
                                        onToggleDetail={handleToggleDetail}
                                        company_name={company.company_name}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <div className='flex items-center text-white gap-3 w-full h-full justify-center'>
                            <span><MapPinOff size={20} /></span>
                            <span>No Companies available at the moment</span>
                        </div>
                    )
                ))}
        </div>
    )
}

export default MapViewGrid

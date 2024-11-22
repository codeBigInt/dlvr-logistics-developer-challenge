import React, { useRef } from 'react'
import Image from 'next/image'
import { PlaceType } from '@/app/utils/types'
import CompanyDetail from './CompanyDetail'

type MapViewBoxProps = {
    addressInfo: PlaceType,
    company_name: string,
    email: string,
    openDetailIndex: number | null,
    onToggleDetail: (index: number | null) => void
    phone: string,
    index: number
}

const MapViewBox = ({ addressInfo, company_name, email, phone, index, onToggleDetail, openDetailIndex }: MapViewBoxProps) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const { lat, long, place, address } = addressInfo
    const TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN
    const isDetailsDisplayed = openDetailIndex === index
    const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+0000ff(${long},${lat})/${long},${lat},10.3/400x300@2x?access_token=${TOKEN}`
    return (
        <div className='relative cursor-pointer md:w-[49%] w-full md:flex-row flex-col md:flex-wrap'>
            <div
                onClick={() => {
                    onToggleDetail(isDetailsDisplayed ? null : index)
                }}
                className='relative w-full md:h-[300px] h-[400px]' ref={mapRef}>
                <Image
                    src={mapboxUrl}
                    alt={place as string}
                    width={400}
                    height={300}
                    loading='lazy'
                    className='rounded-lg w-full h-full'
                /> 
                <span className='absolute top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-[68px] -translate-y-[72px] text-[12px] bg-gray-400 bg-opacity-90 text-white rounded-2xl py-1 px-3'>{place}</span>
            </div>
            { 
                isDetailsDisplayed && (
                    <CompanyDetail 
                        company_name={company_name}
                        email={email}
                        phone={phone}
                        address={address as string}
                    />
                )
            }
        </div>
    )
}

export default MapViewBox

import React, { useEffect, useRef } from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import Image from 'next/image'
import { PlaceType } from '@/app/utils/types'

const MapViewBox = ({ addressInfo }: { addressInfo: PlaceType, company_name: string, email: string, phone: string }) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const { lat, long, place, address } = addressInfo
    const API_KEY = process.env.NEXT_PUBLIC_MAP_TILLER_API_KEY
    // useEffect(() => {

    //     const initMap = async () => {
    //         const loader = new Loader({
    //             apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    //             version: "weekly"
    //         }) 

    //         const {Map} = await loader.importLibrary("maps")

    //         const position = {
    //             lat: 37.7749,
    //             lng: -122.4194
    //         }

    //         const mapOptions: google.maps.MapOptions = {
    //             center: position,
    //             zoom: 17,
    //             mapId: "logistics app"
    //         }

    //         const map = new Map(mapRef.current as HTMLDivElement, mapOptions)
    //     }
    //     initMap()
    // }) 

    return (
        <div className='w-1/2 h-[400px]' ref={mapRef}>
            <Image
                src={`https://api.maptiler.com/maps/streets-v2/static/${long},${lat},1.154818109052104/400x300[@2x].png?key=${API_KEY}`}
                alt={place}
                width={400}
                height={300}
                loading='lazy'
                className='rounded-lg w-full h-full'
            />
        </div>
    )
}

export default MapViewBox

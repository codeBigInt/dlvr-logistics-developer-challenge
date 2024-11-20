import { MapData, PlaceType } from '@/app/utils/types';
import { Loader } from 'lucide-react';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
interface MapListProps {
    mapList: MapData[]
    loading: boolean;
    error: Error | null;
    form: UseFormReturn<{
        companyName: string;
        email: string;
        phone: string;
        address: string;
    }, any, undefined>;
    setPlace: (value: PlaceType) => void;
    onSelectItem?: () => void;
}
const MapList = ({ mapList, loading, error, form, setPlace, onSelectItem }: MapListProps) => {
    const handleSelection = (mapItem: MapData) => {
        form.setValue("address", mapItem.display_name)
        setPlace({
            address: mapItem.display_name,
            lat: mapItem.lat,
            long: mapItem.lon,
            place: mapItem.name
        })
        onSelectItem?.()
    }
    return (
        <div className='w-full flex flex-col items-center bg-white p-4 mt-2 rounded-lg absolute left-0 overflow-x-hidden overflow-y-scroll max-h-[220px] shadow-xl border border-gray-400'>
            {loading ? (
                <div className='flex items-center py-6 justify-center w-full h-full'>
                    <p className='flex items-center gap-2 justify-center'><span><Loader className='animate-spin' /></span> Loading</p>
                </div>
            ) : error ? (
                <div className='text-red-500 py-6 w-full text-center'>
                    {error.message}
                </div>
            ) : mapList.length > 0 ? (
                <div className='w-full h-full flex flex-col'>
                    {mapList.map((mapItem, index) => (
                        <div
                            className={`w-full px-2 py-6 hover:bg-gray-100 cursor-pointer ${index !== (mapList.length - 1) ? "border-b-[1px] border-b-gray-500" : ""
                                }`}
                            key={mapItem.place_id}
                            onClick={() => handleSelection(mapItem)}
                        >
                            <h2 className='text-sm'>{mapItem.display_name}</h2>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-gray-500 w-full py-6 text-center'>
                    <p>Type to search your location</p>
                </div>
            )}
        </div>
    )
}

export default MapList

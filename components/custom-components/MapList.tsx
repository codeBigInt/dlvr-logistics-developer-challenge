import { MapData, PlaceType } from '@/app/utils/types';
import { Loader, Search } from 'lucide-react';
import React, { useState } from 'react'
import { Path, PathValue, UseFormReturn } from 'react-hook-form';
import { useLocationSearch } from '@/app/utils/query';
import { z } from "zod"
import useDebounce from '@/app/utils/useDebounce';

interface MapListProps<T extends z.ZodTypeAny> {
    form: UseFormReturn<z.infer<T>>;
    setPlace: (value: PlaceType) => void;
    onSelectItem?: () => void;
}
const MapList = <T extends z.ZodTypeAny>({ form, setPlace, onSelectItem }: MapListProps<T>) => {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedValue = useDebounce(searchQuery)
    const {
        data: suggestions = [],
        isLoading,
    } = useLocationSearch(debouncedValue)
    const handleSelection = (mapItem: MapData) => {
        form.setValue("address" as Path<z.infer<T>>, mapItem.display_name as PathValue<z.infer<T>, Path<z.infer<T>>>)
        setPlace({
            address: mapItem.display_name,
            lat: mapItem.lat,
            long: mapItem.lon,
            place: mapItem.name
        })
        onSelectItem?.()
    }
    return (
        <div className='w-full flex flex-col items-center bg-white p-4 mt-2 rounded-lg absolute left-0 overflow-x-hidden overflow-y-auto min-h-[240px] max-h-[240px] shadow-xl border border-gray-400'>
            <div className='flex items-center pl-2 gap-2 border border-gray-500 rounded-lg w-full'>
                <Search />
                <input className='py-3 w-[90%] border-none rounded-r-lg outline-none flex-1' type='text' placeholder='Search address..' onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            {isLoading ? (
                <div className='flex items-center py-6 justify-center w-full h-full'>
                    <p className='flex items-center gap-2 justify-center'><span><Loader className='animate-spin' /></span> Loading</p>
                </div>
            ) : suggestions.length > 0 ? (
                <div className='w-full h-full flex flex-col'>
                    {suggestions.map((mapItem, index) => (
                        <div
                            className={`w-full px-2 py-6 hover:bg-gray-100 cursor-pointer ${index !== (suggestions.length - 1) ? "border-b-[1px] border-b-gray-500" : ""
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

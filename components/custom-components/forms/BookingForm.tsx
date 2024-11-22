"use client"
import { BookingFormData, bookingFormSchema } from '@/app/utils/schemas'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { bookingFormFields } from '@/app/utils/formFieldArray'
import { PlaceType } from '@/app/utils/types'
import { addBooking, showErrorAlert, showSuccessAlert } from '@/app/utils/action'
import CustomForm from './Form'


const BookingForm = ({ onOpenChange }: { onOpenChange: () => void }) => {
    const [isBooking, setIsBooking] = useState<boolean>(false)
    const [place, setPlace] = useState<PlaceType | null>()
    const form = useForm<BookingFormData>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            phone: "",
            date: ""
        }
    })

    const handleBooking = async (data: BookingFormData) => {
        const newBooking = {
            name: data.name,
            address: {
                long: place?.long,
                lat: place?.lat,
                address: data.address,
                place: place?.place
            },
            email: data.email,
            phone: data.phone,
            date: data.date
        }

        setIsBooking(true)
        try {
            await addBooking(newBooking)
            setIsBooking(false)
            onOpenChange()
            showSuccessAlert("Booked successfully", "Your booking order has been added")
            form.reset();
        } catch (error) {
            showErrorAlert("Error Occured", "Failed to add booking")
            console.error("Failed to register company.")
        } finally {
            setIsBooking(false)
        }
    }


    return (
        <div className='h-max w-full bg-white rounded-lg md:p-6 p-3'>
            <h3 className='py-6 text-2xl font-light'>Book Delivery</h3>
            <CustomForm
                formFields={bookingFormFields}
                formType={form}
                btnText='Book Now'
                isSubmiting={isBooking}
                handleSubmit={(data: BookingFormData) => handleBooking(data)}
                setPlace={setPlace}
            />
        </div>
    )
}

export default BookingForm
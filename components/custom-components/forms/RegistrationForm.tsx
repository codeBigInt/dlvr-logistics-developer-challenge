"use client"
import { FormData, registerFormSchema } from '@/app/utils/schemas'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { registrationFormFields } from '@/app/utils/formFieldArray'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/app/config/config'
import { PlaceType } from '@/app/utils/types'
import { useQueryClient } from '@tanstack/react-query'
import { showErrorAlert, showSuccessAlert } from '@/app/utils/action'
import CustomForm from './Form'


const RegistrationForm = () => {
    const [isRegistering, setIsRegistering] = useState<boolean>(false)
    const [place, setPlace] = useState<PlaceType | null>()
    const companyCollection = collection(db, "companies")
    const queryClient = useQueryClient()

    const form = useForm<FormData>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            companyName: "",
            address: "",
            email: "",
            phone: "",
        },
        mode: 'onChange'
    })

    const handleRegister = async (data: FormData) => {
        const newCompanyDetail = {
            company_name: data.companyName,
            address: {
                long: place?.long,
                lat: place?.lat,
                address: data.address,
                place: place?.place
            },
            email: data.email,
            phone: data.phone,
        }

        setIsRegistering(true)
        try {
            await addDoc(companyCollection, newCompanyDetail)
            setIsRegistering(false)
            showSuccessAlert("Booked successfully", "Your booking order has been added. Scroll to view your company")
            queryClient.invalidateQueries({ queryKey: ["companies"] })
            form.reset();
        } catch {
            showErrorAlert("Error Occured", "Failed to add booking")
            console.error("Failed to register company.")
        } finally {
            setIsRegistering(false)
        }
    }


    return (
        <div className='lg:w-[35%] h-max w-full bg-white rounded-lg p-6'>
            <h3 className='py-6 text-2xl font-light'>Register Company</h3>
            <CustomForm
                formFields={registrationFormFields}
                formType={form}
                btnText='Register'
                isSubmiting={isRegistering}
                handleSubmit={(data: FormData) => handleRegister(data)}
                setPlace={setPlace}
            />
        </div>
    )
}

export default RegistrationForm

"use client"
import { FormData, registerFormSchema } from '@/app/utils/schemas'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { registrationFormFields } from '@/app/utils/formFieldArray'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/app/config/config'
import { Loader, LocateFixedIcon } from "lucide-react"
import MapList from '../MapList'
import { PlaceType } from '@/app/utils/types'
import { useLocationSearch } from '@/app/utils/query'
import { useQueryClient } from '@tanstack/react-query'


const RegistrationForm = () => {
    const [isRegistering, setIsRegistering] = useState<boolean>(false)
    const [isMapListDisplayed, setMapListDisplayed] = useState<boolean>(false)
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
        }
    })

    const watchAddresField = form.watch("address")
    const isFormValid = form.formState.isValid

    const {
        data: suggestions = [],
        isLoading,
    } = useLocationSearch(watchAddresField)

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
            queryClient.invalidateQueries({queryKey: ["companies"]})
            form.reset();
        } catch {
            console.error("Failed to register company.")
        } finally {
            setIsRegistering(false)
        }
    }


    return (
        <div className='lg:w-[35%] w-full bg-white rounded-lg p-6'>
            <h3 className='py-6 text-2xl font-light'>Register Company</h3>
            <Form {...form}>
                <form className='flex relative flex-col gap-4' onSubmit={form.handleSubmit(handleRegister)}>
                    {
                        registrationFormFields.map((formField, index) => (
                            <div key={formField.name} className='w-full'>
                                <FormField
                                    name={formField.name}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col w-full'>
                                            <label htmlFor={formField.label} className='text-[14px] text-gray-600'>{formField.label}</label>
                                            {index === 2 ? (
                                                <div className='border w-full pl-2 flex items-center justify-between border-gray-500 rounded-lg'>
                                                    <span>+234</span>
                                                    <input
                                                        {...field}
                                                        id={formField.name}
                                                        value={field.value || ""}
                                                        placeholder={formField.placeholder}
                                                        type={formField.type === "number" ? "tel" : formField.type}
                                                        className='p-3 outline-none border-none flex-1 w-[90%] rounded-r-lg'
                                                    />
                                                </div>
                                            ) : (index === 1 ? (
                                                <div className='relative w-full'>
                                                    <div className='relative border w-full px-2 flex items-center justify-between border-gray-500 rounded-lg'>
                                                        <input
                                                            {...field}
                                                            onFocus={() => setMapListDisplayed(true)}
                                                            id={formField.name}
                                                            value={field.value || ""}
                                                            placeholder={formField.placeholder}
                                                            type={formField.type === "number" ? "tel" : formField.type}
                                                            className={`p-3 outline-none border-none flex-1 w-[90%] rounded-r-lg`}
                                                        />
                                                        <LocateFixedIcon />
                                                    </div>
                                                    {isMapListDisplayed && <MapList onSelectItem={() => setMapListDisplayed(false)} setPlace={setPlace} form={form} mapList={suggestions} loading={isLoading} />}
                                                </div>
                                            ) : (
                                                <input
                                                    {...field}
                                                    onFocus={() => index === 1 ? setMapListDisplayed(true) : setMapListDisplayed(false)}
                                                    id={formField.name}
                                                    value={field.value || ""}
                                                    placeholder={formField.placeholder}
                                                    type={formField.type === "number" ? "tel" : formField.type}
                                                    className={`border border-gray-500 rounded-lg p-3 outline-none`}
                                                />
                                            ))}
                                            <p className='text-red-400 text-[12px]'>{form.formState.errors?.[formField.name]?.message}</p>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))
                    }
                    <button disabled={isFormValid ? false : true} className={`${isFormValid ? "bg-blue-500" : "bg-blue-500 bg-opacity-50"} p-3 rounded-lg mt-6 flex justify-center items-center text-white`}>
                        {isRegistering ? <Loader className='animate-spin' size={16} /> : "Register"}
                    </button>
                </form>
            </Form>
        </div>
    )
}

export default RegistrationForm

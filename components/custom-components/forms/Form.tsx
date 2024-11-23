"use client"
import React, { useState } from 'react'
import { Path, UseFormReturn } from 'react-hook-form'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Loader, MapPin } from "lucide-react"
import MapList from '../MapList'
import { z } from "zod"
import { PlaceType } from '@/app/utils/types'


interface CustomFormProps<T extends z.ZodTypeAny>{
    isSubmiting: boolean;
    formType: UseFormReturn<z.infer<T>>;
    formFields:  Array<{
        name: Path<z.infer<T>>;
        label: string;
        placeholder?: string;
        type: string;
      }>;
    setPlace: (value: PlaceType) => void;
    handleSubmit: (data: z.infer<T>) => void;
    btnText: string;
}

const CustomForm = <T extends z.ZodTypeAny>({formType, formFields, setPlace, isSubmiting, handleSubmit, btnText}: CustomFormProps<T>) => {
    const [isMapListDisplayed, setMapListDisplayed] = useState<boolean>(false)
    const isFormValid = formType.formState.isValid

    return (
        <div className='h-full w-full bg-white rounded-lg'>
            <Form {...formType}>
                <form className='flex w-full text-[14px] relative flex-col gap-4' onSubmit={formType.handleSubmit(handleSubmit)}>
                    {
                        formFields.map((formField, index) => (
                            <div key={formField.name} className='w-full'>
                                <FormField
                                    name={formField.name}
                                    control={formType.control}
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col w-full'>
                                            <label htmlFor={formField.label} className='text-[14px] text-gray-600'>{formField.label}</label>
                                            {formField.name === "phone" ? (
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
                                            ) : (formField.name === "address" ? (
                                                <div className='relative w-full'>
                                                    <div onClick={() => setMapListDisplayed(!isMapListDisplayed)} className='relative cursor-pointer border w-full pl-3 flex items-center justify-between border-gray-500 rounded-lg'>
                                                        <MapPin />
                                                        <span className={`px-2 py-3 text-[14px] cursor-pointer outline-none border-none flex-1 w-[90%] rounded-r-lg`}>{(field.value.length > 30 ? field.value.slice(0, 30) + "....." : field.value) || "Find your address"}</span>
                                                    </div>
                                                    {isMapListDisplayed && <MapList onSelectItem={() => setMapListDisplayed(false)} setPlace={setPlace} form={formType} />}
                                                </div>
                                            ) : (
                                                <input
                                                    {...field}
                                                    onFocus={() => index === 1 ? setMapListDisplayed(true) : setMapListDisplayed(false)}
                                                    id={formField.name}
                                                    value={field.value || ""}
                                                    placeholder={formField.placeholder}
                                                    type={formField.type === "number" ? "tel" : formField.type}
                                                    className={`border w-full border-gray-500 rounded-lg p-3 outline-none`}
                                                />
                                            ))}
                                            <p className='text-red-400 text-[12px]'>{String(formType.formState.errors?.[formField.name]?.message || "")}</p>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))
                    }
                    <button disabled={isFormValid ? false : true} className={`${isFormValid ? "bg-blue-500" : "bg-blue-500 bg-opacity-50"} p-3 rounded-lg mt-6 flex justify-center items-center text-white`}>
                        {isSubmiting ? <Loader className='animate-spin' size={16} /> : btnText}
                    </button>
                </form>
            </Form>
        </div>
    )
}

export default CustomForm

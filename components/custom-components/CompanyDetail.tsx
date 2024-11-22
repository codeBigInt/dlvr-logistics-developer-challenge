"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import pin from "../../public/pin.png"
import emailIcon from "../../public/email.png"
import smartphone from "../../public/smartphone.png"
import Modal from './Modal';
import BookingForm from './forms/BookingForm';

interface CompanyDetailsProps {
    company_name: string;
    address: string;
    email: string;
    phone: string;
}
const CompanyDetail = ({ company_name, address, email, phone }: CompanyDetailsProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='absolute shadow-xl z-20 w-[95%] left-[50%] -translate-x-[50%] flex flex-col gap-6 p-6 top-[40%] bg-white rounded-lg'>
            <h3 className='font-semibold uppercase text-[20px]'>{company_name}</h3>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center w-full text-[12px]'>
                    <Image src={pin} alt='pin' width={16} height={16} />
                    <span className=' text-gray-600'>{address}</span>
                </div>
                <div className='flex gap-2 items-center w-full text-[12px]'>
                    <Image src={smartphone} alt='pin' width={16} height={16} />
                    <span className=' text-gray-600'>+234{phone}</span>
                </div>
                <div className='flex gap-2 items-center w-full text-[12px]'>
                    <Image src={emailIcon} alt='pin' width={16} height={16} />
                    <span className=' text-gray-600'>{email}</span>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='font-semibold capitalize text-[18px]'>Place Order</h3>
                <button onClick={() => setIsOpen(true)} className='bg-green-600 rounded-sm text-white p-3 w-full'>
                    Book Now
                </button>
            </div>
            {
                isOpen && (
                    <Modal onOpenChange={() => setIsOpen(!isOpen)}>
                        <BookingForm onOpenChange={() => setIsOpen(!isOpen)} />
                    </Modal>
                )
            }
        </div>
    )
}

export default CompanyDetail

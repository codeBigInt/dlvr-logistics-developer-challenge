"use client"
import RegistrationForm from '@/components/custom-components/forms/RegistrationForm'
import dynamic from 'next/dynamic'
const MapViewGrid = dynamic(() => import('../components/custom-components/MapViewGrid'), { ssr: false })
import React from 'react'

const HomePage = () => {
  return (
    <section className='w-full flex lg:flex-row flex-col bg-gray-300 min-h-[100vh] gap-6 justify-center p-6'>
      <RegistrationForm />
      <section className='flex-1 bg-gray-400 p-4 rounded-lg'>
       <MapViewGrid />
      </section>
    </section>
  )
}

export default HomePage

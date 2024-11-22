"use client"
import RegistrationForm from '@/components/custom-components/forms/RegistrationForm'
import dynamic from 'next/dynamic'
const MapViewGrid = dynamic(() => import('../components/custom-components/MapViewGrid'), { ssr: false })
import React from 'react'

const HomePage = () => {
  return (
    <section className='w-full pb-20 flex lg:flex-row flex-col bg-gray-300 min-h-[100vh] gap-6 justify-center overflow-x-hidden p-4 md:p-6'>
      <RegistrationForm />
      <section className='flex-1 flex justify-center lg:max-h-[95vh] md:bg-gray-400 bg-transparent md:p-3 rounded-lg'>
        <div className='w-full flex justify-center lg:pb-10 custom-scrollbar overflow-x-hidden lg:overflow-y-auto'>
          <MapViewGrid />
        </div>
      </section>
    </section>
  )
}

export default HomePage

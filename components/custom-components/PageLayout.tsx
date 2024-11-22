"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextFont } from 'next/dist/compiled/@next/font'
import React from 'react'

const PageLayout = ({ children, poppins }: { children: React.ReactNode, poppins: NextFont }) => {
  const queryClient = new QueryClient()
    
    return (
        <html lang="en">
            <body
                className={`${poppins.className} antialiased`}
            >
                <QueryClientProvider client={queryClient}>
                    {children}
                    <div id="modal-box"></div>
                </QueryClientProvider>
            </body>
        </html>
    )
}

export default PageLayout

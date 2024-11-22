import { z } from "zod"

export const registerFormSchema = z.object({
    companyName: z.string().min(5, {message: "Please enter a valid company name"}),
    email: z.string().includes("@", {message: "Please enter a valid email"}),
    phone: z.string().min(10, {message: "Please enter a valid phone number"}).max(10, {message: "Please enter a valid"}),
    address: z.string().min(5, {message: "Please enter a valid address"})
})

export const bookingFormSchema = z.object({
    name: z.string().min(2, {message: "Please enter a valid name"}),
    email:z.string().min(2, {message: "Please enter a valid email"}),
    phone: z.string().min(2, {message: "Please enter a valid phone number"}),
    address: z.string().min(5, {message: "Please enter a valid location"}),
    date: z.string().min(5, {message: "Please enter a valid date"})
})

export type FormData = z.infer<typeof registerFormSchema>
export type BookingFormData = z.infer<typeof bookingFormSchema>
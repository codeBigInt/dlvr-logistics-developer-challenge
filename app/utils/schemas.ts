import { z } from "zod"

export const registerFormSchema = z.object({
    companyName: z.string().min(5, {message: "Please enter a valid company name"}),
    email: z.string().includes("@", {message: "Please enter a valid email"}),
    phone: z.string().min(10, {message: "Please enter a valid phone number"}).max(10, {message: "Please enter a valid"}),
    address: z.string().min(5, {message: "Please enter a valid address"})
})

export type FormData = z.infer<typeof registerFormSchema>
interface FormFieldPattern {
    name: "companyName" | "email" | "phone" | "address",
    placeholder: string;
    type: string;
    label: string;
}

export const registrationFormFields: FormFieldPattern[] = [
    {
        name: 'companyName',
        placeholder: 'Enter Company Name',
        type: 'text',
        label: 'Company Name *'
    },
    {
        name: 'address',
        placeholder: 'Enter company address',
        type: 'text',
        label: 'Address *'
    },
    {
        name: 'phone',
        placeholder: '0000 0000 000',
        type: 'number',
        label: 'Phone number *'
    },
    {
        name: 'email',
        placeholder: 'Enter company email address',
        type: 'text',
        label: 'Email address *'
    },
]
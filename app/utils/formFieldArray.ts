export interface FormFieldPattern {
    name: "companyName" | "email" | "phone" | "address",
    placeholder: string;
    type: string;
    label: string;
}
export interface BookingFormFieldPattern {
    name: "name" | "email" | "phone" | "address"| "date",
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
        placeholder: 'Type to find your company\'s address',
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

export const bookingFormFields: BookingFormFieldPattern[] = [
    {
        name: 'name',
        placeholder: 'Enter Recipent\'s Name',
        type: 'text',
        label: 'Recipent\'s Name *'
    },
    {
        name: 'email',
        placeholder: 'Enter Recipent\'s Email',
        type: 'text',
        label: 'Recipent\'s email *'
    },
    {
        name: 'address',
        placeholder: 'Type to find recipent\'s address',
        type: 'text',
        label: 'Recipent\'s address *'
    },
    {
        name: 'phone',
        placeholder: '0000 0000 000',
        type: 'text',
        label: 'Recipents\'s Phone Detail *'
    },
    {
        name: 'date',
        placeholder: 'Pick a delivery date',
        type: 'date',
        label: 'Delivery date *'
    }
]
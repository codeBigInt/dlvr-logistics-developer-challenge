Here’s a comprehensive README template tailored for your Next.js/Firebase logistics booking application: 

---

# Logistics Booking Application

## Description

This project is a web application built using **Next.js** and **Firebase**, designed for logistics companies to register their services and allow users to book their services directly from an interactive map. 

### Key Features:
- **Company Registration**: Companies can register through a dedicated form.
- **Interactive Map**: Displays registered companies' locations.
- **Company Details Popup**: Clicking on a company marker reveals detailed information about the company in a popup.
- **Booking Functionality**: A "Book Now" button opens a modal with a booking form, enabling users to initiate a booking process.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Features

1. **Company Registration**
   - A form for logistics companies to create an account and input details such as name, email, whatsapp contact info and address.

2. **Interactive Map**
   - Registered companies' locations are marked on a dynamic map.
   - Clicking a marker opens a popup showing company information.

3. **Booking Modal**
   - The popup contains a "Book Now" button.
   - Clicking "Book Now" opens a modal with a booking form.
   - Users can provide details to finalize their booking.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codeBigInt/dlvr-logistics-developer-challenge.git
   cd dlvr-logistics
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up Firebase:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration to a `.env.local` file (see [Environment Variables](#environment-variables)).

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Company Registration**:
   - Navigate to `/register` to add a new company.
   - Enter the company details and submit.

2. **Explore Map**:
   - The homepage displays an interactive map showing company locations.
   - Click on a marker to view company details.

3. **Make a Booking**:
   - From the popup, click the "Book Now" button.
   - Fill out the booking form in the modal and submit.


## Technologies Used

- **Frontend**: Next.js (React framework)
- **Backend**: Firebase (Authentication, Firestore, Functions)
- **Mapping**: [MapBox](https://mapbox.com/) or Google Maps API
- **Styling**: Tailwind CSS or CSS Modules

---

## Folder Structure

```
.
├── public/             # Static files
├── app/
│   ├── config/     # Firebase configuration
│   └── utils/      # Helper arrays,  schema, type, functions queries
├── components/          
│   ├── custom-components/     # Custom components
│   └── ui/                    # Shadcn ui component
├── next.config.js      # Next.js configuration
├── package.json        # Node.js dependencies
└── README.md           # Project documentation
```


## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
```


## Contributing

Contributions are welcome! 

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your fork:
   ```bash
   git push origin feature-name
   ```
4. Submit a pull request.


### Future Improvements

- Add support for filtering companies by service type or location.
- Integrate payment gateway for bookings.
- Provide admin dashboard for managing bookings.

Feel free to suggest additional features or report bugs in the Issues section.

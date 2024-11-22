import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../config/config"
import Swal from 'sweetalert2';
import { BookingType, GetCompanyResponse, MapData } from "./types"

export const fetchCompanies = async () => {
    const companyRef = collection(db, "companies")
    try {
        const response = await getDocs(companyRef)
        return response.docs.map(company => ({
            id: company.id,
            ...company.data()
        } as GetCompanyResponse))
    } catch (error) {
        console.error(error)
    }
}

export const addBooking = async (booking: BookingType) => {
    const companyRef = collection(db, "bookings")
    try {
        const response = await addDoc(companyRef, booking)
        return response
    } catch (error) {
        return error
    }
}
// Success alert
export const showSuccessAlert = (title: string, message?: string) => {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  };
  
  // Error Alert
  export const showErrorAlert = (title: string, message?: string) => {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'Ok',
    });
  };

export const fetchLocations = async (address: string) => {
    if (address.length < 3) {
        return [];
    }

    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5`,
        {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'dlvr-logistics'
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch locations");
    }

    return response.json() as Promise<MapData[]>;
}

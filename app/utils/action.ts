import { collection, getDocs } from "firebase/firestore"
import { db } from "../config/config"
import { GetCompanyResponse, MapData } from "./types"

export const fetchCompanies = async () => {
    const companyRef = collection(db, "companies")
    const response = await getDocs(companyRef)
    return response.docs.map(company => ({
        id: company.id,
        ...company.data()
    } as GetCompanyResponse))
}


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

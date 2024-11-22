export interface MapData {
    addresstype: string;
    boundingbox: string[];
    class: string;
    display_name: string;
    importance: string;
    lat: string;
    licence: string;
    lon: string;
    name: string;
    osm_id: number;
    osm_type: string;
    place_id: number;
    place_rank: number;
    type: string;
}

export interface PlaceType {
    address?: string;
    lat?: string;
    long?: string;
    place?: string;
}

export interface BookingType {
    name: string;
    address: PlaceType;
    email: string;
    phone: string;
    date: string;
}

export interface GetCompanyResponse {
    id: string;
    company_name: string;
    address: PlaceType;
    email: string;
    phone: string;
}
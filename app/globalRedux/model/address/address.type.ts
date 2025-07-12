export interface Address {
    ID: number;
    UserID: number;
    CityId: number;
    Street: string;
    HouseNumber: string;
    Entrance: string;
    Apartment: number;
    Floor: number;
    Intercom: string;
    Comment: string;
    Coordinates: string;
    IsDefault: boolean;
    Address: string;
}

export interface GetAddressResponse {
    success: boolean;
    data: Address[];
}

export interface CreateAddressRequest {
    address: string;
    apartment: number;
    city_id: number;
    comment: string;
    coordinates: string;
    entrance: string;
    floor: number;
    house_number: string;
    intercom: string;
    is_default: boolean;
    street: string;
    user_id: number;
}

export interface CreateAddressResponse {
    success: boolean;
    data: Address;
}


export interface Address {
    ID: number
    UserID: number
    CityId: number
    Street: string
    HouseNumber: string
    Apartment: number
    Comment: string
    Coordinates: string
    Entrance: string
    Floor: number
    Intercom: string
    IsDefault: boolean
}

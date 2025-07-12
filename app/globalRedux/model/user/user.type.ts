export interface UserData {
    ID: number;
    user_login: string;
    role: string;
    status: string;
    company_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    inn: string;
    lang_code: string;
}

export interface GetUserResponse {
    success: boolean;
    data: UserData;
}


export interface CreateUserRequest {
    firstname: string;
    lastname: string;
    phone_number: string;
    email: string;
    user_login: string;
    lang_code: string;
    inn: string;
    role: string;
}

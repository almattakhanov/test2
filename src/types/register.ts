export interface Register {
    phone: string;
}

export interface RegisterResponse {
    success: true;
    data: {
        phone: string;
        temp_token: string;
    };
}


export interface VerifyRequest {
    token: string;
    code: string;
}

export interface VerifyResponse {
    data: {
        jwt_token: string;
        refresh_token: string;
    };
}

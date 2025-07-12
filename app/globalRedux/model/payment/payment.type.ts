export interface CreatePaymentRequest {
    order_id: number;
    order_number: string;
    phone_number: string;
}

export interface CreatePaymentResponse {
    success: boolean;
    data?: {
        payment_id: string;
        phone_verified?: boolean;
    };
    error?: string;
}

export interface ConfirmPaymentRequest {
    payment_id: number;
    otp_code: string;
}
export type ConfirmPaymentStatus = "NEW" | "EXECUTED" | "REJECTED"| "CANCELLED" | "PROCESSING" | "WAITING"

export interface ConfirmPaymentResponse {
    success: boolean;
    data?: {
        status: ConfirmPaymentStatus;
    };
    error?: string;
}



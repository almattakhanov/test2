import { baseApi } from "@/app/globalRedux/shared/api";
import {Register, RegisterResponse, VerifyRequest, VerifyResponse} from "@/src/types/register";


export const authApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        postRegister: create.mutation<RegisterResponse, Register>({
            query: (data) => ({
                url: 'user-service-go/v1/auth/otp/send',
                method: 'POST',
                body: data,

            }),
        }),
        verifyOtp: create.mutation<VerifyResponse, VerifyRequest>({
            query: (data) => ({
                url: 'user-service-go/v1/auth/otp/verify',
                method: 'POST',
                body: data,
            }),
        }),

        sendMassage: create.mutation<BecomeSellerResponse, BecomeSellerRequest>({
            query: (data) => ({
                url: 'become-seller',
                method: 'POST',
                body: data,
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    usePostRegisterMutation,
    useSendMassageMutation,
    useVerifyOtpMutation
} = authApi;


export interface BecomeSellerRequest {
    name: string
    phone: string
}

export interface BecomeSellerResponse {
    success: boolean
    message?: string
    // другие поля, если есть
}
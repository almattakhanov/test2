import { baseApi } from "@/app/globalRedux/shared/api";
import {
    ConfirmPaymentRequest, ConfirmPaymentResponse,
    CreatePaymentRequest,
    CreatePaymentResponse
} from "@/app/globalRedux/model/payment/payment.type";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // Создание оплаты
        createPayment: build.mutation<CreatePaymentResponse, CreatePaymentRequest>({
            query: (body) => ({
                url: "/payment-service-go/v1/core/create-payment",
                method: "POST",
                body,
            }),
        }),

        // Подтверждение оплаты (OTP)
        confirmPayment: build.mutation<ConfirmPaymentResponse, ConfirmPaymentRequest>({
            query: (body) => ({
                url: "/payment-service-go/v1/core/confirm-payment",
                method: "POST",
                body,
            }),
            invalidatesTags: ['Order'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreatePaymentMutation,
    useConfirmPaymentMutation
} = paymentApi;

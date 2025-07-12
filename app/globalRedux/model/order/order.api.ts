import {baseApi} from "@/app/globalRedux/shared/api";
import {
    GetMyOrdersResponse, GetOrderResponse,
    OrderCheckoutRequest,
    OrderCheckoutResponse,
    OrderCreateRequest, OrderCreateResponse
} from "@/app/globalRedux/model/order/order.type";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        // Оформление заказа
        checkoutOrder: build.mutation<OrderCheckoutResponse, OrderCheckoutRequest>({
            query: (body) => ({
                url: "/order-service-go/v1/order/checkout",
                method: "POST",
                body,
            }),
        }),

        // Создание заказа
        createOrder: build.mutation<OrderCreateResponse, OrderCreateRequest>({
            query: (body) => ({
                url: "/order-service-go/v1/order/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ['Order']
        }),

        // Получение заказов пользователя
        getMyOrders: build.query<GetMyOrdersResponse, void>({
            query: () => ({
                url: "/order-service-go/v1/order/my",
                method: "GET",
            }),
            providesTags: ['Order']
        }),

        // Получение конкретного заказа
        getOrder: build.query<GetOrderResponse, string>({
            query: (id) => ({
                url: `/order-service-go/v1/order/${id}`,
                method: "GET",
            }),
        }),

        // Отмена заказа
        cancelOrder: build.mutation<void, { orderNumber: string; reason: string }>({
            query: ({orderNumber, reason}) => ({
                url: `/order-service-go/v1/orders/${orderNumber}/cancel`,
                method: "PUT",
                body: {
                    reason,
                },
            }),
            invalidatesTags: ['Order'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useCheckoutOrderMutation,
    useCancelOrderMutation,
    useCreateOrderMutation,
    useLazyGetOrderQuery,
    useGetMyOrdersQuery
} = orderApi;

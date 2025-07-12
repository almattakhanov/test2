import {baseApi} from "@/app/globalRedux/shared/api";
import {
    AddCartRequest,
    AddCartResponse,
    GetCartResponse,
    ProductCartType, ProductIdsPayload, UpdateCartProductResponse
} from "@/app/globalRedux/model/cart/cart.type";


export const cartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getCart: build.query<GetCartResponse, void>({
            query: (body) => ({
                url: '/cart-service-go/v1/cart/get-by-user',
                method: 'GET',
                // headers: {
                //     'CityId': `1`,
                //   //  'UserId': `1`,
                // },
                body,
            }),
            providesTags: ['Cart']
        }),

        addCart: build.mutation<AddCartResponse, AddCartRequest>({
            query: (body) => ({
                url: '/cart-service-go/v1/cart/create',
                method: 'POST',
                // headers: {
                //     'CityId': `1`,
                //   //  'UserId': `1`,
                // },
                body,
            }),
            invalidatesTags: ['Cart']
        }),

        deleteAllCart: build.mutation<AddCartResponse, AddCartRequest>({
            query: (body) => ({
                url: '/cart-service-go/v1/cart/delete',
                method: 'DELETE',
                // headers: {
                //     'CityId': `1`,
                //     //  'UserId': `1`,
                // },
                body,
            }),
            invalidatesTags: ['Cart']
        }),

        deleteProductCart: build.mutation<any, ProductIdsPayload>({
            query: (body) => ({
                url: '/cart-service-go/v1/cart/delete-by-ids',
                method: 'DELETE',
                // headers: {
                //     'CityId': `1`,
                //     //  'UserId': `1`,
                // },
                body,
            }),
            invalidatesTags: ['Cart']
        }),

        updateCartProduct: build.mutation<UpdateCartProductResponse, ProductCartType>({
            query: (body) => ({
                url: '/cart-service-go/v1/cart/update-quantity',
                method: 'PUT',
                // headers: {
                //     'CityId': `1`,
                //    // 'UserId': `1`,
                // },
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(baseApi.util.invalidateTags(['Cart']));
                } catch (err) {
                    console.error('Ошибка при обновлении количества:', err);
                }
            },
        }),





    }),
    overrideExisting: true,
});

export const {
    useGetCartQuery,
    useLazyGetCartQuery,
    useAddCartMutation,
    useDeleteProductCartMutation,
    useUpdateCartProductMutation,
} = cartApi;
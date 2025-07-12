import {baseApi} from '@/app/globalRedux/shared/api';
import {
    Address,
    CreateAddressRequest,
    CreateAddressResponse,
    GetAddressResponse,
} from '@/app/globalRedux/model/address/address.type';

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAddress: build.query<GetAddressResponse, void>({
            query: () => ({
                url: `/user-service-go/v1/user/address/get-address`,
                method: 'GET',
                headers: {
                  //  CityId: '1',
                    //   UserId: '1',
                },
            }),
            providesTags: ['Address'],
        }),
        createAddress: build.mutation<CreateAddressResponse, CreateAddressRequest>({
            query: (body) => ({
                url: `/user-service-go/v1/user/address/create-address`,
                method: 'POST',
                body,
                headers: {
                  //  CityId: '1',
                    //  UserId: '1',
                },
            }),
            invalidatesTags: ['Address'],
        }),
        deleteAddress: build.mutation<void, number>({
            query: (id) => ({
                url: `/user-service-go/v1/user/address/delete-address/${id}`,
                method: 'DELETE',
                headers: {
                  //  CityId: '1',
                    //  UserId: '1',
                },
            }),
            invalidatesTags: ['Address'],
        }),
        updateAddress: build.mutation<any, { id: number; data: Partial<Address> }>({
            query: ({id, data}) => ({
                url: `/user-service-go/v1/user/address/update-address/${id}`,
                method: 'PUT',
                body: data,
                headers: {
                  //  CityId: '1',
                    // UserId: '1',
                },
            }),
            invalidatesTags: ['Address'],
        }),
        setDefaultAddress: build.mutation<void, number>({
            query: (id) => ({
                url: `/user-service-go/v1/user/address/set-default/${id}`,
                method: 'POST',
                // headers: {
                //     CityId: '1',
                // },
            }),
            invalidatesTags: ['Address'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetAddressQuery,
    useCreateAddressMutation,
    useDeleteAddressMutation,
    useUpdateAddressMutation,
    useSetDefaultAddressMutation,
} = userApi;

import { baseApi } from "@/app/globalRedux/shared/api";
import { CreateUserRequest, GetUserResponse } from "@/app/globalRedux/model/user/user.type";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<GetUserResponse, void>({
            query: () => ({
                url: `/user-service-go/v1/user/get-user`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        createUser: build.mutation<GetUserResponse, CreateUserRequest>({
            query: (body) => ({
                url: `/user-service-go/v1/user/update-user`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetUserQuery,
    useCreateUserMutation,
} = userApi;

import {baseApi} from "@/app/globalRedux/shared/api";
import {
    CommonSuccessResponse,
    CreateFavoriteRequest,
    CreateFavoriteResponse,
    DeleteFavoriteRequest,
    DeleteFavoriteResponse,
    GetFavoritesResponse
} from "@/app/globalRedux/model/favorites/favorites.type";

export const favoriteApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getFavorites: build.query<GetFavoritesResponse, void>({
            query: () => ({
                url: '/favorites-service-go/v1/favorite/get-by-user',
                method: 'GET',
            }),
            providesTags: ['Favorites']
        }),

        createFavorite: build.mutation<
            CreateFavoriteResponse,
            CreateFavoriteRequest
        >({
            query: (body) => ({
                url: '/favorites-service-go/v1/favorite/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Favorites']
        }),

        deleteFavorites: build.mutation<
            DeleteFavoriteResponse,
            DeleteFavoriteRequest
        >({
            query: ({product_ids}) => ({
                url: '/favorites-service-go/v1/favorite/delete-by-ids',
                method: 'DELETE',
                body: {product_ids},
            }),
            invalidatesTags: ['Favorites']
        }),

        deleteAllFavorites: build.mutation<CommonSuccessResponse, void>({
            query: () => ({
                url: '/favorites-service-go/v1/favorite/delete',
                method: 'DELETE',
            }),
            invalidatesTags: ['Favorites']
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetFavoritesQuery,
    useCreateFavoriteMutation,
    useDeleteFavoritesMutation,
    useDeleteAllFavoritesMutation

} = favoriteApi;
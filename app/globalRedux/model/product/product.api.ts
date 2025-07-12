import {baseApi} from "@/app/globalRedux/shared/api";
import {
    CategoryByIdResponse,
    GetCategoryProductsParams,
    GetProductResponse,
    OfferResponse, SearchResponse
} from "@/app/globalRedux/model/product/product.type";
import {GetProductsResponse} from "@/app/globalRedux/model/caterogy/category.type";

export const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProduct: build.mutation<GetProductResponse, number>({
            query: (id) => ({
                url: `/product-service-go/v1/product/get-by-id/${id}`,
                method: 'GET',
                // headers: {
                //     'CityId': `1`,
                //     //'UserId': `1`,
                // },
            }),
        }),

        getOffers: build.mutation<OfferResponse, number>({
            query: (id) => ({
                url: `/product-service-go/v1/product/${id}/offers`,
                method: 'GET',
                // headers: {
                //     'CityId': `1`,
                // },
            }),
        }),

        searchProducts: build.query<SearchResponse, { query: string; page?: number; size?: number }>({
            query: ({ query, page = 1, size = 50 }) => ({
                url: '/search-service-go/v1/products/search',
                method: 'GET',
                params: { query, page, size },
                // headers: {
                //     'CityId': `1`,
                // },
            }),
        }),

        // запрос для главной
        // Сезонные скидки → Смартфоны по выгодной цене
        getSmartphonesAtGreatPrice: build.query<GetProductsResponse, void>({
            query: (id) => ({
                url: `product-service-go/v1/product/get-all?category_id=286&brand_ids[]=2&limit=15`,
                method: 'GET',
                // headers: {
                //     'CityId': `1`,
                // },
            }),
        }),

        getCategoryById: build.query<CategoryByIdResponse, number>({
            query: (id) => ({
                url: `/product-service-go/v1/category/get-by-id/${id}`,
                method: 'GET',
                // headers: {
                //     'CityId': `1`,
                // },
            }),
        }),

        // запрос для главной
        // Умная техника для вашего комфорта
        getReliableHouseholdAppliances : build.query<GetProductsResponse, void>({
            query: (id) => ({
                url: `product-service-go/v1/product/get-all?category_id=462&limit=15`,
                method: 'GET',
                // headers: {
                //     'CityId': `1`,
                // },
            }),
        }),

        // Играй с удовольствием
        getGames : build.query<GetProductsResponse, void>({
            query: (id) => ({
                url: `product-service-go/v1/product/get-all?category_id=467&limit=15`,
                method: 'GET',
                // headers: {
                //     'CityId': `1`,
                // },
            }),
        }),
        // запрос для главной
        // Недавно смотрели -> Новинки и аксессуары
        getNewProductsAndAccessories : build.query<GetProductsResponse, void>({
            query: (id) => ({
                url: `product-service-go/v1/product/get-all?category_id=281&brand_ids[]=2&limit=15`,
                method: 'GET',
                // headers: {
                //     'CityId': `1`,
                // },
            }),
        }),


        getCategoryProductsNew: build.mutation<GetProductsResponse, GetCategoryProductsParams>({
            query: (params) => {
                const {
                    category_id,
                    page = 1,
                    limit = 20,
                    all,
                    min_price,
                    max_price,
                    brand_ids,
                    company_ids,
                    attributes,
                    order_by,
                    sort_dir,
                } = params;

                return {
                    url: `/product-service-go/v1/product/get-all`,
                    method: 'GET',
                    params: {
                        category_id,
                        page,
                        limit,
                        all,
                        min_price,
                        max_price,
                        order_by,
                        sort_dir,
                        'brand_ids[]' : brand_ids,
                        'company_ids[]' : company_ids,
                        'attributes[]' : attributes,

                       // ...(company_ids?.length ? { company_ids } : {}),
                        //...(attributes?.length ? { attributes } : {}),
                    },
                    // headers: {
                    //     'CityId': '1',
                    // },
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetGamesQuery,
    useGetCategoryProductsNewMutation,
    useLazyGetCategoryByIdQuery,
    useLazySearchProductsQuery,
    useGetOffersMutation,
    useGetProductMutation,
    useGetNewProductsAndAccessoriesQuery,
    useGetReliableHouseholdAppliancesQuery,
    useGetSmartphonesAtGreatPriceQuery
   } = productApi;
import {baseApi} from "@/app/globalRedux/shared/api";
import {
    BrandResponse,
    CategoryResponse,
    GetProductsResponse,
} from "@/app/globalRedux/model/caterogy/category.type";

export const categoryApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
            getCategoryFirstLevel: build.query<CategoryResponse, void>({
                query: () => ({
                    url: `product-service-go/v1/category/first-level`,
                    method: 'GET',

                }),
            }),

            getBrands: build.query<BrandResponse, void>({
                query: () => ({
                    url: `product-service-go/v1/brand/get-all`,
                    method: 'GET',

                }),
            }),

            getCategoryProducts: build.mutation<any, number>({
                query: (parentId) => ({
                    url: `/product-service-go/v1/category/get-all?parentId=${parentId}`,
                    method: 'GET',

                }),
            }),

        }),
    overrideExisting: true,
});

export const {
    useGetCategoryProductsMutation,
 //   useGetCategoryProductsNewMutation,
    useGetBrandsQuery,
    useGetCategoryFirstLevelQuery,
    } = categoryApi;

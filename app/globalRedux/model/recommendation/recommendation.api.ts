import {baseApi} from "@/app/globalRedux/shared/api";
import {
    CreateProductReviewDto,
    CreateProductReviewResponse
} from "@/app/globalRedux/model/recommendation/recommendation.type";

export const recommendationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createProductReview: build.mutation<CreateProductReviewResponse, CreateProductReviewDto>({
            query: (body) => {
                const formData = new FormData();
                formData.append("user_short_name", body.user_short_name);
                formData.append("company_id", body.company_id.toString());
                formData.append("company_name", body.company_name);
                formData.append("rating", body.rating.toString());

                if (body.product_id !== undefined) {
                    formData.append("product_id", body.product_id.toString());
                }
                if (body.company_product_id !== undefined) {
                    formData.append("company_product_id", body.company_product_id.toString());
                }
                if (body.review_text !== undefined) {
                    formData.append("review_text", body.review_text);
                }
                if (body.photos) {
                    body.photos.forEach((file) => {
                        formData.append("photos", file);
                    });
                }
                console.log('formData content:');
                for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }
                return {
                    url: "/recommendation-service-go/v1/review/product/create",
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const { useCreateProductReviewMutation } = recommendationApi;
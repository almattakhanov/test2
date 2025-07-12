export interface CreateProductReviewDto {
    user_short_name: string;
    product_id?: number;
    company_product_id?: number;
    company_id: number;
    company_name: string;
    rating: number;
    review_text?: string;
    photos?: File[];
}
export interface CreateProductReviewResponse {
    data: {
        review_id: number;
    };
    success: boolean;
}

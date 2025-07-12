
export interface CreateFavoriteRequest {
    products: number[];
}

export interface CreateFavoriteResponse {
    data: {
        created_at: string;
        product_id: number;
    }[];
    success: boolean;
}

export interface ErrorResponse {
    data: {
        details: string;
        error: string;
        hostname: string;
        message: string;
        request_id: string;
        service_code: string;
        status: number;
    };
    success: false;
}

export interface FavoriteProduct {
    product_id: number;
    product_name: string;
    price: number;
    currency: string;
    product_url: string;
    image_urls: string;
    main_image: string;
    company_id?: number;
    quantity?: number;
    rating: number;
    review_count: number;
}

export interface GetFavoritesResponse {
    data: FavoriteProduct[];
    success: boolean;
}


export interface DeleteFavoriteRequest {
    product_ids: number[];
}

export interface DeleteFavoriteResponse {
    data: string; // "OK"
    success: boolean;
}


export interface CommonSuccessResponse {
    data: string; // "OK"
    success: boolean;
}

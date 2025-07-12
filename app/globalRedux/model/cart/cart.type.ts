import {DeliveryInfoType} from "@/app/globalRedux/model/product/product.type";

export interface AddCartRequest {
    products: ProductCartType[];
}
export type ProductCartType = {
    company_id: number;
    company_product_id: number;
    product_id: number;
    quantity: number;
    is_active?: boolean,
    company_info?: {
        average_rating: number;
        company_id: number;
        company_name: string;
        reviews_count: number;
    };
}

export interface AddCartResponse {
    data: {
        products: {
            company_product_id: number;
            product_id: number;
            quantity: number;
        }[];
        total_quantity: number;
    };
    success: boolean;
}

export type UpdateCartProductResponse = {
    data: string,
    success: boolean
}

export interface ErrorCartResponse {
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


export interface GetCartResponse {
    data: {
        cart_total_discount: number;
        cart_total_discount_price: number;
        cart_total_price: number;
        cart_total_quantity: number;
        last_updated_at: string;
        products: CartProduct[];
    };
    success: true;
}


export interface CartProduct {
    available_stock: number;
    company_info: {
        average_rating: number;
        company_id: number;
        company_name: string;
        reviews_count: number;
    };
    company_product_id: number;
    delivery_info: DeliveryInfoType;
    discount_percent: number;
    discount_price: number;
    image_url: string;
    is_active: boolean;
    price: number;
    product_id: number;
    product_name: string;
    product_url: string;
    quantity: number;
    total_price: number;
}

export type DeleteProductType = {
    company_id: number;
    company_product_id: number;
};
export type ProductIdsPayload = {
    product_ids: DeleteProductType[];
};

export type LocalCartType = {
    company_id: number,
    company_info: {
        average_rating: number;
        company_id: number;
        company_name: string;
        reviews_count: number;
    };
    company_product_id: number,
    product_id: number,
    quantity: number,
    product_name: string,
    image_url: string,
    price: number,
    is_active: boolean
}
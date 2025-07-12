import {AvailableFilters, Pagination, Product} from "@/app/globalRedux/model/caterogy/category.type";

export interface ProductRating {
    average_rating: number;
    reviews_count: number;
}

export interface ProductData {
    product_id: number;
    name: string;
    product_has_offer: boolean;
    image_urls: string[];
    price: number;
    discount_price: number;
    discount_percent: number;
    rating: ProductRating;
    brand: string;
    category_ids: string[];
    attributes: AttributesType[];
}

export type AttributesType = {
    attribute_value_id: number,
    id: number,
    name: string,
    value: string,
    value_type: string
}

export interface GetProductResponse {
    success: boolean;
    data: ProductData;
}


export interface OfferResponse {
    success: boolean;
    data: Offer[];
}

type PaymentTerms = {
    [months: string]: number; // ключ — срок (в месяцах), значение — процент
};


export interface Offer {
    company_id: number;
    company_name: string;
    company_product_id: number;
    reviews_count: number;
    average_rating: number;
    price: number;
    payment_info: {
        card: {
            is_active: boolean;
        };
        installment: {
            is_active: boolean;
            terms: PaymentTerms;
        };
        credit: {
            is_active: boolean;
            terms: PaymentTerms;
        };
    };
    delivery_info: DeliveryInfoType;
}

export type DeliveryInfoType = {
    delivery: {
        enabled: boolean;
        provider: string;
        label: string;
        delivery: string;
        price: number;
        is_free: boolean;
    };
    pickup: {
        enabled: boolean;
        available_from: string;
        price: number;
        is_free: boolean;
        pickup_points_count: number;
    };
    available_stock: number;
    is_active: boolean;
}

export interface GetCategoryProductsParams {
    category_id: number;
    page?: number;
    limit?: number;
    all?: boolean;
    min_price?: number;
    max_price?: number;
    brand_ids?: number[];
    company_ids?: number[];
    attributes?: string[]; // JSON-строки
    order_by?: 'price' | 'rating' | 'popular';
    sort_dir?: 'asc' | 'desc';
}


export interface Brand {
    createdAt: string;
    description: string;
    id: number;
    logoURL: string;
    name: string;
    updatedAt: string;
    userID: number;
}

export interface Category {
    createdAt: string;
    id: number;
    name: string;
    parent: string;
    parentID: number;
    updatedAt: string;
    userID: number;
}

export interface CategoryByIdResponse {
    success: boolean;
    data: {
        ID: number;
        Name: string;
        ParentID: number | null;
        Parent: Category | null;
        UserID: number;
        IconURL: string;
        Path: string;
        CreatedAt: string;
        UpdatedAt: string;

    };
}

// export interface Product {
//     brand: Brand;
//     brandID: number;
//     category: Category;
//     categoryID: number;
//     createdAt: string;
//     description: string;
//     id: number;
//     imageURL: string;
//     name: string;
//     updatedAt: string;
//     userID: number;
// }

export interface SearchResponse {
    data: {
        products: Product[],
        available_filters: AvailableFilters;
        pagination: Pagination;
    };
    success: boolean;
}
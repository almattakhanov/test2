export interface Category {
    ID: number;
    Name: string;
    ParentID: number | null;
    Parent: Category | null;
    UserID: number;
    IconURL: string;
    CreatedAt: string;
    UpdatedAt: string;
    is_active: boolean
}

export interface CategoryResponse {
    success: boolean;
    data: Category[];
}

export interface Brand {
    createdAt: string,
    description: string,
    ID: number,
    LogoURL: string,
    Name: string,
    updatedAt: string,
    userID: number
}

export interface BrandResponse {
    success: boolean;
    data: {
        brands: Brand[]
    };
}


// типы для товаров категории
export interface Product {
    currency: string;
    company_id?: number;
    image_urls: string;
    main_image: string;
    price: number;
    product_id: number;
    product_name: string;
    product_url: string;
    rating: number;
    review_count: number;
}

export interface PriceFilter {
    max: number;
    min: number;
}

export interface AttributeValue {
    id: number;
    value: string;
}

export interface Attribute {
    attribute_id: number;
    name: string;
    type: string;
    values: AttributeValue[];
}

export interface Brand {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    level: number;
    name: string;
}

export interface Company {
    id: number;
    name: string;
}

export interface AvailableFilters {
    attributes: Attribute[];
    brands: Brand[];
    categories: Category[];
    companies: Company[];
    price: PriceFilter;
}

export interface Pagination {
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}

export interface GetProductsResponseData {
    available_filters: AvailableFilters;
    pagination: Pagination;
    products: Product[];
}

export interface GetProductsResponse {
    success: boolean;
    data: GetProductsResponseData;
}

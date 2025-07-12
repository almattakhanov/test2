// export interface OrderCheckoutRequest {
//     user_id: number;
//     city_id: number;
//     items: {
//         company_product_id: number;
//         company_id: number;
//         quantity: number;
//     }[];
// }

export interface OrderCheckoutRequest {
    items: {
        company_product_id: number;
        company_id: number;
        quantity: number;
    }[];
}

export interface OrderCheckoutResponse {
    success: boolean;
    data: {
        cart_total_quantity: number;
        cart_total_price: number;
        cart_total_discount: number;
        cart_total_discount_price: number;
        items: CheckoutItem[];
    };
}

interface CheckoutItem {
    product_id: number;
    company_product_id: number;
    company_id: number;
    product_name: string;
    price: number;
    discount_price: number;
    discount_percent: number;
    quantity: number;
    total_price: number;
    total_discount_price: number;
    is_active: boolean;
    delivery_options: DeliveryOption[];
    payment_options: {
        card: {
            is_active: boolean;
        };
        installment: {
            is_active: boolean;
            terms: Record<string, number>; // например: { "3": 7, "6": 7 }
        };
    };
}

interface DeliveryOption {
    type: "delivery" | "pickup";
    enabled: boolean;
    name: string;
    delivery?: string;
    price: number;
    is_free: boolean;
    delivery_type_id: number;
    available_from?: string;
    pickup_points?: PickupPoint[];
}

interface PickupPoint {
    pickup_point_id: number;
    code: string;
    name: string;
    address: string;
    coordinates: string;
    work_schedule: string;
}


export interface OrderCreateItemDeliveryInfo {
    delivery_type_id: number;
    address_id?: number;
    pickup_point_id?: number;
}

export interface OrderCreateItem {
    product_id: number;
    company_product_id: number;
    company_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    discount_amount: number;
    total_price: number;
    delivery_info: OrderCreateItemDeliveryInfo;
}

export interface OrderCreateRequest {
    items: OrderCreateItem[];
    discount_percent: number;
    discount_amount: number;
    total_amount: number;
    payable_amount: number;
    payment_type: "card" | "installment" | "credit";
}

export interface OrderCreateResponse {
    success: boolean;
    data: {
        order_id: number;
        order_number: string;
        total_price: number;
    };
}


export type OrderStatus =
    | 'created'
    | 'waiting_for_payment'
    | 'paid'
    | 'waiting_seller_confirm'
    | 'processing_by_seller'
    | 'ready_for_delivery'
    | 'ready_for_pickup'
    | 'delivering'
    | 'delivered'
    | 'issued'
    | 'canceled'
    | 'full_refund'
    | 'partial_refund';

export interface Order {
    id: number;
    order_number: string;
    status: OrderStatus;
    total_amount: number;
    payment_type: string;
    delivery: string;
    term: string;
    order_items_count: number;
    buyer: string;
    created_at: string;
}

export interface OrderCount {
    count_new: number;
    count_in_work: number;
    count_delivered: number;
    count_completed: number;
    total_count: number;
}

export interface OrderPagination {
    page: number;
    limit: number;
    total: number;
}

export interface GetMyOrdersResponse {
    success: boolean;
    data: {
        orders: Order[];
        order_count: OrderCount;
        pagination: OrderPagination;
    };
}

export interface GetOrderResponse {
    success: boolean;
    data: Order;
}

export interface Order {
    id: number;
    order_number: string;
    status: OrderStatus;
    total_amount: number;
    discount_percent: number;
    discount_amount: number;
    payable_amount: number;
    source: string;
    user_id: number;
    user_name: string;
    user_phone: string;
    payment_type: PaymentType;
    term: string;
    delivery: string;
    company_id: number;
    address_id: number | null;
    address: string | null;
    pickup_point_id: number | null;
    pickup_point_address: string | null;
    is_fiscal_receipt_generated: boolean;
    fiscal_receipt_url: string | null;
    cancellation_reason: string | null;
    order_items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    image_url: string;
    discount_amount: number;
    total_price: number;
    created_at: string;
    updated_at: string;
}
//
// export type OrderStatus =
//     | "created"
//     | "processing"
//     | "executed"
//     | "cancelled"
//     | "rejected"
//     | "waiting";

export type PaymentType = "card" | "cash" | "installment" | string;

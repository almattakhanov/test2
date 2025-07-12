export interface OrderItem {
    id: number;
    image: string;
    name: string;
    color: string;
    memory: string;
    price: string;
    quantity: number;
    isFavorite: boolean;
}

export interface OrderSummary {
    total: string;
    discount: string;
    delivery: string;
    final: string;
    monthly: string;
}

export const orderItems: OrderItem[] = [
    {
        id: 1,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false
    },
    {
        id: 2,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false
    },
    {
        id: 3,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false
    },
    {
        id: 4,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false
    },
    {
        id: 5,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false
    },
];

export const orderSummary: OrderSummary = {
    total: "1 397 928 с",
    discount: "- 345 456 с",
    delivery: "Бесплатно",
    final: "1 397 928 с",
    monthly: "97 928 с"
};

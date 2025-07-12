export interface CartItem {
    id: number;
    image: string;
    name: string;
    color: string;
    memory: string;
    price: string;
    quantity: number;
    isFavorite: boolean;
    inStock: boolean;
}


export interface CartSummary {
    total: string;
    discount: string;
    final: string;
    monthly: string;
}

export const cartItems: CartItem[] = [
    {
        id: 1,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false,
        inStock: true,
    },
    {
        id: 2,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false,
        inStock: true,
    },
    {
        id: 3,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false,
        inStock: false,
    },
    {
        id: 4,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false,
        inStock: true,
    },
    {
        id: 5,
        image: "/productBlock/original.png",
        name: "Смартфон Apple iPhone 15 Pro 256Gb Blue Titanium",
        color: "черный, black titanium",
        memory: "256 ГБ",
        price: "397 928 с",
        quantity: 1,
        isFavorite: false,
        inStock: false,
    },
];


export const cartSummary: CartSummary = {
    total: "1 397 928 с",
    discount: "- 345 456 с",
    final: "1 397 928 с",
    monthly: "97 928 с"
};

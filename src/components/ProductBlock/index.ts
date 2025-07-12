export interface ProductCard {
    id: number
    image: string
    title: string
    price: number
    oldPrice?: number
    installment: string
    quantity: string,
    rating: number
    reviews: number
    isSale?: boolean
    discount?: number
    isFavorite: boolean
}

export const products: ProductCard[] = [
    {
        id: 1,
        image: '/productBlock/original.png',
        title: 'Смартфон Apple iPhone 15 Pro Max 256GB (Титан)',
        price: 1000000,
        oldPrice: 2000000,
        installment: '12 169 с',
        quantity: 'x 12',
        rating: 5.0,
        reviews: 12,
        isSale: true,
        discount: 20,
        isFavorite: false
    },
    {
        id: 2,
        image: '/productBlock/original.png',
        title: 'Смартфон Samsung Galaxy S24 Ultra 512GB (Титановый серый)',
        price: 850000,
        oldPrice: 950000,
        installment: '10 542 с',
        quantity: 'x 12',
        rating: 4.9,
        reviews: 8,
        isSale: true,
        discount: 5,
        isFavorite: true
    },
    {
        id: 3,
        image: '/productBlock/original.png',
        title: 'Смартфон Xiaomi 14 Pro 256GB (Черный)',
        price: 550000,
        oldPrice: 650000,
        installment: '6 819',
        quantity: 'x 12',
        rating: 4.8,
        reviews: 15,
        isSale: true,
        discount: 5,
        isFavorite: false
    },
    {
        id: 4,
        image: '/productBlock/original.png',
        title: 'Смартфон Google Pixel 8 Pro 128GB (Снежный)',
        price: 700000,
        oldPrice: 0,
        installment: '8 680 с',
        quantity: 'x 12',
        rating: 4.7,
        reviews: 5,
        isSale: true,
        discount: 0,
        isFavorite: false
    },
    {
        id: 5,
        image: '/productBlock/original.png',
        title: 'Смартфон OnePlus 12 256GB (Зеленый)',
        price: 600000,
        oldPrice: 750000,
        installment: '7 440 с',
        quantity: 'x 12',
        rating: 4.9,
        reviews: 10,
        isSale: true,
        discount: 20,
        isFavorite: true
    },
    {
        id: 6,
        image: '/productBlock/original.png',
        title: 'Смартфон Huawei Mate 60 Pro 512GB (Фиолетовый)',
        price: 800000,
        oldPrice: 0,
        installment: '9 920 с',
        quantity: 'x 12',
        rating: 4.6,
        reviews: 7,
        isSale: false,
        discount: 0,
        isFavorite: false
    },
    {
        id: 7,
        image: '/productBlock/original.png',
        title: 'Смартфон Huawei Mate 60 Pro 512GB (Фиолетовый)',
        price: 800000,
        oldPrice: 0,
        installment: '9 920 с',
        quantity: 'x 12',
        rating: 4.6,
        reviews: 7,
        isSale: false,
        discount: 0,
        isFavorite: false
    },
    {
        id: 8,
        image: '/productBlock/original.png',
        title: 'Смартфон Huawei Mate 60 Pro 512GB (Фиолетовый)',
        price: 800000,
        oldPrice: 0,
        installment: '9 920 с',
        quantity: 'x 12',
        rating: 4.6,
        reviews: 7,
        isSale: false,
        discount: 0,
        isFavorite: false
    },
    {
        id: 9,
        image: '/productBlock/original.png',
        title: 'Смартфон Huawei Mate 60 Pro 512GB (Фиолетовый)',
        price: 800000,
        oldPrice: 0,
        installment: '9 920 с',
        quantity: 'x 12',
        rating: 4.6,
        reviews: 7,
        isSale: false,
        discount: 0,
        isFavorite: false
    },
    {
        id: 10,
        image: '/productBlock/original.png',
        title: 'Смартфон Huawei Mate 60 Pro 512GB (Фиолетовый)',
        price: 800000,
        oldPrice: 0,
        installment: '9 920 с',
        quantity: 'x 12',
        rating: 4.6,
        reviews: 7,
        isSale: false,
        discount: 0,
        isFavorite: false
    }
];

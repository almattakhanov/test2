export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  isFavorite: boolean;
  isSale: boolean;
  installment: string;
  quantity: string;
  rating: number;
  reviews: number;
  categoryId?: string;
  brand?: string;
  colors?: ProductColor[];
  specifications?: ProductSpec[];
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSpec {
  name: string;
  value: string;
  important?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  image?: string;
  productCount?: number;
}

export interface FilterOption {
  id: string;
  name: string;
  type: 'checkbox' | 'range' | 'color';
  options?: {
    id: string;
    name: string;
    count?: number;
    hex?: string;
  }[];
}

export interface FilterValue {
  id: string;
  name: string;
  count?: number;
  hex?: string;
}
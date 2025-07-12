import { Product } from "@/app/globalRedux/model/caterogy/category.type";
import {FavoriteProduct} from "@/app/globalRedux/model/favorites/favorites.type";

const LOCAL_FAVORITES_KEY = 'local_favorites';

export const getLocalFavorites = (): FavoriteProduct[] => {
    try {
        const data = localStorage.getItem(LOCAL_FAVORITES_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const addLocalFavorite = (product: FavoriteProduct): void => {
    const favorites = getLocalFavorites();
    const exists = favorites.some(item => item.product_id === product.product_id);
    if (!exists) {
        localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify([...favorites, product]));
    }
};

export const removeLocalFavorite = (productId: number): void => {
    const updated = getLocalFavorites().filter(item => item.product_id !== productId);
    localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(updated));
};

export const clearLocalFavorites = () => {
    localStorage.removeItem(LOCAL_FAVORITES_KEY);
};
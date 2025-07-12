import { useEffect, useState } from 'react';
import {
    useCreateFavoriteMutation,
    useDeleteFavoritesMutation,
    useGetFavoritesQuery
} from "@/app/globalRedux/model/favorites/favorites.api";
import {Product} from "@/app/globalRedux/model/caterogy/category.type";
import {
    addLocalFavorite,
    clearLocalFavorites,
    getLocalFavorites,
    removeLocalFavorite
} from "@/src/utils/favoritesStorage";
import {FavoriteProduct} from "@/app/globalRedux/model/favorites/favorites.type";
import {useAuth} from "@/app/hook/useAuth";

export const useFavoriteManager = () => {
    const { isAuth } = useAuth();
    const [createFavorite] = useCreateFavoriteMutation();
    const [deleteFavorites] = useDeleteFavoritesMutation();
    const { data: serverFavorites, refetch } = useGetFavoritesQuery(undefined, {
        skip: !isAuth,
    });

    const [favoriteItems, setFavoriteItems] = useState<FavoriteProduct[]>([]);
    const [hasSynced, setHasSynced] = useState(false); // чтобы не отправлять повторно

    const getIsFavorite = (id: number) => {
        return favoriteItems.some(item => item.product_id === id);
    };

    const toggleFavorite = async (product: FavoriteProduct) => {
        const isFavorite = getIsFavorite(product.product_id);

        if (isAuth) {
            try {
                if (isFavorite) {
                    await deleteFavorites({ product_ids: [product.product_id] }).unwrap();
                    setFavoriteItems(prev => prev.filter(item => item.product_id !== product.product_id));
                } else {
                    await createFavorite({ products: [product.product_id] }).unwrap();
                    setFavoriteItems(prev => [...prev, product]);
                }
            } catch (e) {
                console.error('Ошибка при изменении избранного', e);
            }
        } else {
            if (isFavorite) {
                removeLocalFavorite(product.product_id);
                setFavoriteItems(prev => prev.filter(item => item.product_id !== product.product_id));
            } else {
                addLocalFavorite(product);
                setFavoriteItems(prev => [...prev, product]);
            }

            // Обновим слушателей localStorage
            window.dispatchEvent(new Event('storage'));
        }
    };

    // 🔄 Синхронизация локального избранного при логине
    useEffect(() => {
        const syncLocalToServer = async () => {
            const localFavorites = getLocalFavorites();

            if (localFavorites.length > 0) {
                try {
                    await createFavorite({
                        products: localFavorites.map(item => item.product_id),
                    }).unwrap();

                    clearLocalFavorites();
                    window.dispatchEvent(new Event('storage'));
                    await refetch();
                } catch (e) {
                    console.error('Ошибка при синхронизации избранного', e);
                }
            }

            setHasSynced(true);
        };

        if (isAuth && !hasSynced) {
            syncLocalToServer();
        }
    }, [isAuth, hasSynced, createFavorite, refetch]);

    // 💾 Установка данных
    useEffect(() => {
        if (isAuth && serverFavorites?.data) {
            const transformed: FavoriteProduct[] = serverFavorites.data.map(item => ({
                product_id: item.product_id,
                product_name: item.product_name,
                price: item.price,
                currency: 'c',
                product_url: item.product_url,
                image_urls: item.image_urls,
                main_image: item.main_image,
                company_id: item.company_id,
                rating: item.rating,
                review_count: item.review_count,
                quantity: 1
            }));
            setFavoriteItems(transformed);
        } else {
            setFavoriteItems(getLocalFavorites());
        }
    }, [isAuth, serverFavorites]);

    return {
        favoriteItems,
        toggleFavorite,
        getIsFavorite,
    };
};

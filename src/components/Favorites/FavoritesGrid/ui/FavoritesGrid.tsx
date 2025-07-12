'use client'

import {FavoritesCard} from "@/src/components/Favorites/FavoritesBlock/ui/FavoritesCard";


import styles from './FavoritesGrid.module.scss';
import {useFavoriteManager} from "@/app/hook/useFavoriteManager";

export const FavoritesGrid = () => {


    const {favoriteItems, toggleFavorite} = useFavoriteManager();

    const handleRemove = async (id: number) => {
        const product = favoriteItems.find(p => p.product_id === id);
        if (product) await toggleFavorite(product);
    };

    if (favoriteItems.length === 0) {
        return <p>Избранных товаров нет</p>;
    }

    return (
        <div className={styles.grid}>
            {favoriteItems.map(product => (
                <FavoritesCard
                    key={product.product_id}
                    product={product}
                    onRemove={handleRemove}
                />
            ))}
        </div>
    );
};

// <div className={styles.grid}>
//     {favorites.map((product) => (
//         <FavoritesCard
//             key={product.product_id}
//             {...product}
//             onRemove={handleRemove}
//         />
//     ))}
// </div>

'use client';


import styles from "./ProductParameters.module.scss";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import SupplierOffersModal from "@/src/components/ProductParameters/SupplierOffersModal/SupplierOffersModal";
import {Offer, ProductData} from "@/app/globalRedux/model/product/product.type";
import Favorite from "@/public/icons/favourite.svg";
import clsx from "clsx";
import {useAuth} from "@/app/hook/useAuth";
import {
    useCreateFavoriteMutation,
    useDeleteFavoritesMutation,
    useGetFavoritesQuery
} from "@/app/globalRedux/model/favorites/favorites.api";
import {addLocalFavorite, getLocalFavorites, removeLocalFavorite} from "@/src/utils/favoritesStorage";
import {Product} from "@/app/globalRedux/model/caterogy/category.type";
import {Rate} from "antd";

interface ProductParametersProps {
    product: ProductData;
    offers: Offer[];
}

const ProductParameters = ({product, offers}: ProductParametersProps) => {
    const {isAuth} = useAuth();
    const [createFavorite] = useCreateFavoriteMutation();
    const [deleteFavorites] = useDeleteFavoritesMutation();
    const {data: serverFavorites} = useGetFavoritesQuery(undefined, {skip: !isAuth});

    const [isFavorite, setIsFavorite] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleOk = () => setIsModalOpen(false);



    const pluralizeReview = (count: number) => {
        if (count % 10 === 1 && count % 100 !== 11) return 'отзыв';
        if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'отзыва';
        return 'отзывов';
    };



    useEffect(() => {
        if (!product) return;

        if (isAuth && serverFavorites?.data) {
            const exists = serverFavorites.data.some(item => item.product_id === product.product_id);
            setIsFavorite(exists);
        } else {
            const local = getLocalFavorites();
            const exists = local.some(item => item.product_id === product.product_id);
            setIsFavorite(exists);
        }
    }, [isAuth, serverFavorites, product]);

    const toggleFavorite = async () => {
        if (!product) return;

        const productForFavorite: Product = {
            product_id: product.product_id,
            product_name: product.name,
            product_url: product.image_urls[0] || '', // или другой путь
            price: product.price,
            main_image: product.image_urls[0] || '',
            image_urls: product.image_urls[0] || '',
            currency: 'с', // если фиксировано, иначе возьми из product
            rating: product.rating.average_rating ?? 0,
            review_count: product.rating.reviews_count ?? 0,
        };

        if (isAuth) {
            if (isFavorite) {
                try {
                    await deleteFavorites({product_ids: [product.product_id]}).unwrap();
                    setIsFavorite(false);
                } catch (e) {
                    console.error("Ошибка при удалении из избранного", e);
                }
            } else {
                try {
                    await createFavorite({products: [product.product_id]}).unwrap();
                    setIsFavorite(true);
                } catch (e) {
                    console.error("Ошибка при добавлении в избранное", e);
                }
            }
        } else {
            if (isFavorite) {
                removeLocalFavorite(product.product_id);
                setIsFavorite(false);
                window.dispatchEvent(new Event("storage"));
            } else {
                addLocalFavorite(productForFavorite);
                setIsFavorite(true);
                window.dispatchEvent(new Event("storage"));
            }
        }
    };

    if (!product) return null;

    return (
        <div className={styles.productParameters}>
            <div className={styles.descriptionBlock}>
                <h2 className={styles.title}>{product.name}</h2>
                <span className={styles.article}>Артикул: {product.product_id}</span>

                <button className={styles.favorites} onClick={toggleFavorite}>
                    <Favorite
                        width={26}
                        height={24}
                        className={clsx(styles.favoriteIcon, {[styles.active]: isFavorite})}
                    />
                    <span>{isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</span>
                </button>

                <div className={styles.sharesInfo}>
                    {/* TODO: Рассрочка и распродажа — временные заглушки */}
                    <p className={styles.installmentBadge}>Рассрочка 0•0•12</p>
                    {product.discount_percent > 0 && (
                        <p className={styles.discountBadge}>-{product.discount_percent}%</p>
                    )}
                    {/* TODO: Нет данных на бэке */}
                    <p className={styles.saleBadge}>Распродажа</p>
                </div>

                <div className={styles.ratingBlock}>
                    <div className={styles.rating}>
                        <Rate allowHalf value={product.rating.average_rating} disabled/>
                        <span>
                          {product?.rating?.average_rating === 0
                              ? '0'
                              : (product?.rating?.average_rating ?? 0).toFixed(1)}
                        </span>
                    </div>
                    <span>
                      • {product?.rating?.reviews_count === 0
                        ? 'Нет отзывов'
                        : `${product.rating.reviews_count} ${pluralizeReview(product.rating.reviews_count)}`}
                    </span>
                    {/*<span>• {product.rating.reviews_count} отзывов</span>*/}
                </div>
            </div>

            {/* TODO: Отсутствует инфа о модификациях (например, объем памяти, цвет) */}
            {/* <Segmented options={['128 ГБ', '256 ГБ']} /> */}
            {/* <ColorPicker /> */}

            <button className={styles.viewOffers} onClick={showModal}>
                Смотреть предложения
            </button>

            <SupplierOffersModal
                offers={offers}
                product={product}
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
};

export default ProductParameters;

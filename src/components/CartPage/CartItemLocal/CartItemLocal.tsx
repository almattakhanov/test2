import React from 'react';
import {CartProduct, LocalCartType} from "@/app/globalRedux/model/cart/cart.type";
import {useI18n} from "@/locales/client";
import styles from "@/src/components/CartPage/CartItem/ui/CartItem.module.scss";
import {Checkbox} from "antd";
import Link from "next/link";
import Image from "next/image";
import Favorite from "@/public/icons/favourite.svg";
import clsx from "clsx";
import {useFavoriteManager} from "@/app/hook/useFavoriteManager";
import {formatPrice} from "@/src/utils/helpers";

interface CartItemLocalProps {
    item: LocalCartType;
    onIncrement: () => void;
    onDecrement: () => void;
    deleteProduct: () => void;
    isSelected: boolean;
    onToggle: () => void;
}

const CartItemLocal = (
    {
        item,
        onIncrement,
        onDecrement,
        deleteProduct,
        isSelected,
        onToggle
    }: CartItemLocalProps) => {
    const t = useI18n();


    const {favoriteItems, toggleFavorite, getIsFavorite} = useFavoriteManager();

    return (
        <div className={styles.cartItem}>
            <div
                className={`${styles.left} ${!item.is_active ? styles.outOfStock : ''}`}
            >
                <div className={styles.checkbox}>
                    <Checkbox
                        checked={isSelected}
                        onChange={onToggle}
                    />
                </div>
                <Link
                    href={`/product-page/${item.product_id}`}
                    className={styles.cardLink}
                >
                    <Image
                        src={item.image_url}
                        alt="Product"
                        width={92}
                        height={112}
                        className={styles.image}
                    />
                    <div className={styles.itemInfo}>
                        <div className={styles.namePrice}>
                            <p className={styles.name}>{item.product_name}</p>
                            <div className={styles.price}>{formatPrice(item.price)} c</div>
                        </div>
                        {/*<div className={styles.desc}>Цвет: {item.color}</div>*/}
                        {/*<div className={styles.desc}>Память: {item.memory}</div>*/}
                    </div>

                </Link>


            </div>
            <div className={styles.icons}>
                <div className={styles.leftIcons}>
                    <button
                        className={styles.favoriteButton}
                        onClick={() => toggleFavorite({
                            currency: 'c',
                            image_urls: item.image_url,
                            main_image: item.image_url,
                            price: item.price,
                            product_id: item.product_id,
                            product_name: item.product_name,
                            product_url: item.image_url,
                            rating: 5,
                            review_count: 5,
                            company_id: item.company_id,
                            quantity: 1,
                        })}
                    >
                        <Favorite
                            className={clsx(styles.favoriteIcon, {
                                [styles.active]: getIsFavorite(item.product_id),
                            })}/>
                    </button>
                    <button onClick={deleteProduct}>
                        <Image
                            src='/icons/delete.svg'
                            alt="delete"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
                {item.is_active ? (
                    <div className={styles.bottom}>
                        <div className={styles.actions}>
                            <button onClick={onDecrement}>
                                <Image
                                    src="/icons/remove.svg"
                                    alt="delete"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={onIncrement}>
                            <Image
                                    src="/icons/add.svg"
                                    alt="delete"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.notAvailable}>{t('outOfStock')}</div>
                )}
            </div>
        </div>
    );
}

export default CartItemLocal;
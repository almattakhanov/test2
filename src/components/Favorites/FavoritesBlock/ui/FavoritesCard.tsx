'use client'

import styles from './FavoritesCard.module.scss'
import React from 'react'
import Image from 'next/image'
import Favorite from "@/public/icons/favourite.svg";
import clsx from "clsx";
import Link from "next/link";
import {FavoriteProduct} from "@/app/globalRedux/model/favorites/favorites.type";

interface Props {
    product: FavoriteProduct;
    onRemove: (id: number) => void;
}

export const FavoritesCard = ({product, onRemove}: Props) => {

    return (
        <div className={styles.card}>
            <button
                className={styles.favorite}
                onClick={() => onRemove(product.product_id)}
                aria-label="Удалить из избранного"
            >
                <Favorite className={clsx(styles.favoriteIcon, styles.active)}/>
            </button>
            <Link className={styles.imageWrapper}
                  href={`/product-page/${product.product_id}`}
            >
                <Image
                    src={product.main_image}
                    alt={product.product_name}
                    width={208}
                    height={272}
                    className={styles.image}
                />
                {/*{installment && <div className={styles.installment}>*/}
                {/*    <span>Рассрочка</span>*/}
                {/*    {installment}</div>}*/}
                {/*<button className={styles.favorite}>*/}
                {/*    <Image*/}
                {/*        src='/productBlock/vectorTrue.svg'*/}
                {/*        alt={title}*/}
                {/*        width={32}*/}
                {/*        height={32}*/}
                {/*    />*/}
                {/*</button>*/}
                {/*{discount && <div className={styles.discount}>{discount}</div>}*/}
                {/*{sale && <div className={styles.sale}>Распродажа</div>}*/}
                <div className={styles.priceContainer}>
                  <span
                      className={`${styles.currentPrice} ${
                          false ? styles.discountedPrice : ""
                      }`}
                  >
                    {product.price.toLocaleString()} с
                  </span>
                    {/*{oldPrice && (*/}
                    {/*    <span className={styles.oldPrice}>*/}
                    {/*      {oldPrice.toLocaleString()} с*/}
                    {/*    </span>*/}
                    {/*)}*/}
                </div>

                {/*<div className={styles.installmentPrice}>*/}
                {/*      <span className={styles.installmentValue}>*/}
                {/*        {installmentPrice}с*/}
                {/*      </span>*/}
                {/*    <span className={styles.quantity}>x {quantity}</span>*/}
                {/*</div>*/}

                <div className={styles.title}>{product.product_name}</div>

                {/*<div className={styles.ratingWrapper}>*/}
                {/*    <div className={styles.rating}>*/}
                {/*        <Rate count={1} defaultValue={1}/>*/}
                {/*        <p className={styles.count}>5,0</p>*/}
                {/*    </div>*/}
                {/*    <span className={styles.feedback}>• 12 отзывов</span>*/}
                {/*</div>*/}

                <button className={styles.addToCart}>Подробнее</button>
            </Link>


        </div>
    )
}

"use client";

import Image from "next/image";
import styles from "./ProductList.module.scss";
import Link from "next/link";
import {Product} from "@/app/globalRedux/model/caterogy/category.type";
import {useAddCartMutation} from "@/app/globalRedux/model/cart/cart.api";
import React, {useEffect, useState} from "react";
import Favorite from "@/public/icons/favourite.svg";
import clsx from "clsx";
import {addLocalFavorite, getLocalFavorites, removeLocalFavorite} from "@/src/utils/favoritesStorage";
import {useAuth} from "@/app/hook/useAuth";
import {useCreateFavoriteMutation, useGetFavoritesQuery} from "@/app/globalRedux/model/favorites/favorites.api";
import {useFavoriteManager} from "@/app/hook/useFavoriteManager";
import {formatPrice} from "@/src/utils/helpers";
import {Skeleton} from "antd";


type Props = {
    products: Product[];
    isLoading: boolean;
    isLoadingMore?: boolean;
    loadMoreRef: React.RefObject<HTMLDivElement | null>;
};

export default function ProductList(
    {
        products,
        isLoading,
        isLoadingMore,
        loadMoreRef
    }: Props) {

    const {favoriteItems, toggleFavorite, getIsFavorite} = useFavoriteManager();

    return (
        <section className={styles.productBlock}>
            <>
                <div className={styles.productsGrid}>
                    {
                        isLoading && <div className={styles.loaderContainer1}>
                            <svg
                                className={styles.loader}
                                width="152"
                                height="154"
                                viewBox="0 0 152 154"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M127.801 26.1994C129.034 24.9665 129.038 22.962 127.754 21.782C117.184 12.0662 104.028 5.57252 89.8393 3.10716C74.6122 0.46135 58.9394 2.58439 44.9649 9.18588C30.9904 15.7874 19.3966 26.5449 11.7693 39.9871C4.14203 53.4292 0.853771 68.8995 2.35433 84.2818C3.85489 99.6641 10.071 114.207 20.1523 125.922C30.2337 137.636 43.688 145.951 58.6749 149.727C73.6617 153.503 89.4493 152.557 103.878 147.018C117.323 141.857 128.976 132.943 137.469 121.368C138.5 119.962 138.109 117.996 136.661 117.025C135.213 116.054 133.257 116.445 132.22 117.847C124.456 128.343 113.845 136.429 101.615 141.123C88.4012 146.196 73.9428 147.062 60.2177 143.604C46.4925 140.146 34.171 132.531 24.9384 121.803C15.7058 111.075 10.013 97.756 8.63879 83.6687C7.26457 69.5815 10.276 55.4136 17.2611 43.1032C24.2463 30.7928 34.864 20.9409 47.662 14.8952C60.46 8.84948 74.8132 6.90518 88.7584 9.32824C101.665 11.5708 113.638 17.453 123.285 26.2513C124.573 27.4263 126.568 27.4324 127.801 26.1994Z"
                                    fill="#1963AA"
                                    stroke="#1963AA"
                                    strokeWidth="2.5"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    }
                    {products?.map((product, index) => (
                        <React.Fragment key={`${product.product_id}-${product.company_id}-${index}`}>
                            <div className={styles.productCard}>
                                <button
                                    className={styles.favoriteButton}
                                    onClick={() => toggleFavorite({
                                        ...product,
                                        company_id: 0,
                                        quantity: 1,
                                    })}
                                >
                                    <Favorite
                                        className={clsx(styles.favoriteIcon, {
                                            [styles.active]: getIsFavorite(product.product_id),
                                        })}/>
                                </button>
                                <Link
                                    href={`/product-page/${product.product_id}`}
                                    className={styles.cardLink}>
                                    <div className={styles.imageContainer}>
                                        {product.main_image ? (
                                            <Image
                                                src={product.main_image}
                                                alt={product.product_name}
                                                width={224}
                                                height={273}
                                                className={styles.productImage}
                                            />
                                        ) : (
                                            <div className={styles.imagePlaceholder}>
                                                Нет фото
                                            </div>
                                        )}
                                        {/*<div className={styles.installmentBadge}>Рассрочка 0•0•12</div>*/}
                                        {/*<div className={styles.installmentBadgeMob}>0•0•12</div>*/}
                                        {/*{product.isSale && (*/}
                                        {/*  <div className={styles.saleBadge}>Распродажа</div>*/}
                                        {/*)}*/}
                                        {/*{hasDiscount(product) && (*/}
                                        {/*  <div className={styles.discountBadge}>*/}
                                        {/*    -{product.discount}%*/}
                                        {/*  </div>*/}
                                        {/*)}*/}
                                    </div>

                                    <div className={styles.productInfo}>
                                        <div className={styles.priceContainer}>
                                      <span
                                          className={`${styles.currentPrice} ${
                                              false ? styles.discountedPrice : ""
                                          }`}
                                      >
                                        {formatPrice(product.price)} c
                                          {/*{product.currency}*/}
                                      </span>
                                            {/*{product.oldPrice && (*/}
                                            {/*  <span className={styles.oldPrice}>*/}
                                            {/*    {product.oldPrice.toLocaleString()} с*/}
                                            {/*  </span>*/}
                                            {/*)}*/}
                                        </div>

                                        {/*информация по рассрочке*/}

                                        {/*<div className={styles.installment}>*/}
                                        {/*  <span className={styles.installmentValue}>*/}
                                        {/*    {product.installment}*/}
                                        {/*  </span>*/}
                                        {/*  <span className={styles.quantity}>{product.quantity}</span>*/}
                                        {/*</div>*/}

                                        <h3 className={styles.productTitle} title={product.product_name}>
                                            {product.product_name}
                                        </h3>

                                        <div className={styles.ratingContainer}>
                                            <div className={styles.rating}>
                                                <Image
                                                    src="/productBlock/rating-star.svg"
                                                    alt="Rating"
                                                    width={18}
                                                    height={18}
                                                    className={styles.ratingIcon}
                                                />
                                                <span className={styles.ratingText}>
                                            {product.rating.toFixed(1)}
                                        </span>
                                            </div>
                                            {product.review_count > 0 && (
                                                <span className={styles.reviews}>
                                          • {product.review_count} отзыв{product.review_count === 1 ? '' : product.review_count < 5 ? 'а' : 'ов'}
                                        </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.cardActions}>
                                        <button className={styles.addToCartButton}>Подробнее</button>
                                    </div>
                                </Link>
                            </div>


                        </React.Fragment>
                    ))}
                    {isLoadingMore && <div className={styles.loaderContainer}>
                        <svg
                            className={styles.loader}
                            width="152"
                            height="154"
                            viewBox="0 0 152 154"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M127.801 26.1994C129.034 24.9665 129.038 22.962 127.754 21.782C117.184 12.0662 104.028 5.57252 89.8393 3.10716C74.6122 0.46135 58.9394 2.58439 44.9649 9.18588C30.9904 15.7874 19.3966 26.5449 11.7693 39.9871C4.14203 53.4292 0.853771 68.8995 2.35433 84.2818C3.85489 99.6641 10.071 114.207 20.1523 125.922C30.2337 137.636 43.688 145.951 58.6749 149.727C73.6617 153.503 89.4493 152.557 103.878 147.018C117.323 141.857 128.976 132.943 137.469 121.368C138.5 119.962 138.109 117.996 136.661 117.025C135.213 116.054 133.257 116.445 132.22 117.847C124.456 128.343 113.845 136.429 101.615 141.123C88.4012 146.196 73.9428 147.062 60.2177 143.604C46.4925 140.146 34.171 132.531 24.9384 121.803C15.7058 111.075 10.013 97.756 8.63879 83.6687C7.26457 69.5815 10.276 55.4136 17.2611 43.1032C24.2463 30.7928 34.864 20.9409 47.662 14.8952C60.46 8.84948 74.8132 6.90518 88.7584 9.32824C101.665 11.5708 113.638 17.453 123.285 26.2513C124.573 27.4263 126.568 27.4324 127.801 26.1994Z"
                                fill="#1963AA"
                                stroke="#1963AA"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    }
                </div>

                {/*{isLoadingMore && (*/}
                {/*    <Skeleton active paragraph={{rows: 3}}/>*/}
                {/*)}*/}
            </>
            {/*{isLoading ? (*/
            }
            {/*    <div className={styles.loaderContainer}>*/
            }
            {/*        <svg*/
            }
            {/*            className={styles.loader}*/
            }
            {/*            width="152"*/
            }
            {/*            height="154"*/
            }
            {/*            viewBox="0 0 152 154"*/
            }
            {/*            fill="none"*/
            }
            {/*            xmlns="http://www.w3.org/2000/svg"*/
            }
            {/*        >*/
            }
            {/*            <path*/
            }
            {/*                d="M127.801 26.1994C129.034 24.9665 129.038 22.962 127.754 21.782C117.184 12.0662 104.028 5.57252 89.8393 3.10716C74.6122 0.46135 58.9394 2.58439 44.9649 9.18588C30.9904 15.7874 19.3966 26.5449 11.7693 39.9871C4.14203 53.4292 0.853771 68.8995 2.35433 84.2818C3.85489 99.6641 10.071 114.207 20.1523 125.922C30.2337 137.636 43.688 145.951 58.6749 149.727C73.6617 153.503 89.4493 152.557 103.878 147.018C117.323 141.857 128.976 132.943 137.469 121.368C138.5 119.962 138.109 117.996 136.661 117.025C135.213 116.054 133.257 116.445 132.22 117.847C124.456 128.343 113.845 136.429 101.615 141.123C88.4012 146.196 73.9428 147.062 60.2177 143.604C46.4925 140.146 34.171 132.531 24.9384 121.803C15.7058 111.075 10.013 97.756 8.63879 83.6687C7.26457 69.5815 10.276 55.4136 17.2611 43.1032C24.2463 30.7928 34.864 20.9409 47.662 14.8952C60.46 8.84948 74.8132 6.90518 88.7584 9.32824C101.665 11.5708 113.638 17.453 123.285 26.2513C124.573 27.4263 126.568 27.4324 127.801 26.1994Z"*/
            }
            {/*                fill="#1963AA"*/
            }
            {/*                stroke="#1963AA"*/
            }
            {/*                strokeWidth="2.5"*/
            }
            {/*                strokeLinejoin="round"*/
            }
            {/*            />*/
            }
            {/*        </svg>*/
            }
            {/*    </div>*/
            }
            {/*) : products?.length === 0 ? (*/
            }
            {/*    <div className={styles.noResults}>*/
            }
            {/*        Нет результатов*/
            }
            {/*    </div>*/
            }
            {/*) : (*/
            }
            {/*    <>*/
            }
            {/*        <div className={styles.productsGrid}>*/
            }
            {/*            {products?.map((product) => (*/
            }
            {/*                <div className={styles.productCard} key={product.product_id}>*/
            }
            {/*                    <button*/
            }
            {/*                        className={styles.favoriteButton}*/
            }
            {/*                        onClick={() => toggleFavorite({*/
            }
            {/*                            ...product,*/
            }
            {/*                            company_id: 0,*/
            }
            {/*                            quantity: 1,*/
            }
            {/*                        })}*/
            }
            {/*                    >*/
            }
            {/*                        <Favorite*/
            }
            {/*                            className={clsx(styles.favoriteIcon, {*/
            }
            {/*                                [styles.active]: getIsFavorite(product.product_id),*/
            }
            {/*                            })}/>*/
            }
            {/*                    </button>*/
            }
            {/*                    <Link*/
            }
            {/*                        href={`/product-page/${product.product_id}`}*/
            }
            {/*                        className={styles.cardLink}>*/
            }
            {/*                        <div className={styles.imageContainer}>*/
            }
            {/*                            {product.main_image ? (*/
            }
            {/*                                <Image*/
            }
            {/*                                    src={product.main_image}*/
            }
            {/*                                    alt={product.product_name}*/
            }
            {/*                                    width={224}*/
            }
            {/*                                    height={273}*/
            }
            {/*                                    className={styles.productImage}*/
            }
            {/*                                />*/
            }
            {/*                            ) : (*/
            }
            {/*                                <div className={styles.imagePlaceholder}>*/
            }
            {/*                                    Нет фото*/
            }
            {/*                                </div>*/
            }
            {/*                            )}*/
            }
            {/*                            /!*<div className={styles.installmentBadge}>Рассрочка 0•0•12</div>*!/*/
            }
            {/*                            /!*<div className={styles.installmentBadgeMob}>0•0•12</div>*!/*/
            }
            {/*                            /!*{product.isSale && (*!/*/
            }
            {/*                            /!*  <div className={styles.saleBadge}>Распродажа</div>*!/*/
            }
            {/*                            /!*)}*!/*/
            }
            {/*                            /!*{hasDiscount(product) && (*!/*/
            }
            {/*                            /!*  <div className={styles.discountBadge}>*!/*/
            }
            {/*                            /!*    -{product.discount}%*!/*/
            }
            {/*                            /!*  </div>*!/*/
            }
            {/*                            /!*)}*!/*/
            }
            {/*                        </div>*/
            }

            {/*                        <div className={styles.productInfo}>*/
            }
            {/*                            <div className={styles.priceContainer}>*/
            }
            {/*                          <span*/
            }
            {/*                              className={`${styles.currentPrice} ${*/
            }
            {/*                                  false ? styles.discountedPrice : ""*/
            }
            {/*                              }`}*/
            }
            {/*                          >*/
            }
            {/*                            {formatPrice(product.price)} c*/
            }
            {/*                              /!*{product.currency}*!/*/
            }
            {/*                          </span>*/
            }
            {/*                                /!*{product.oldPrice && (*!/*/
            }
            {/*                                /!*  <span className={styles.oldPrice}>*!/*/
            }
            {/*                                /!*    {product.oldPrice.toLocaleString()} с*!/*/
            }
            {/*                                /!*  </span>*!/*/
            }
            {/*                                /!*)}*!/*/
            }
            {/*                            </div>*/
            }

            {/*                            /!*информация по рассрочке*!/*/
            }

            {/*                            /!*<div className={styles.installment}>*!/*/
            }
            {/*                            /!*  <span className={styles.installmentValue}>*!/*/
            }
            {/*                            /!*    {product.installment}*!/*/
            }
            {/*                            /!*  </span>*!/*/
            }
            {/*                            /!*  <span className={styles.quantity}>{product.quantity}</span>*!/*/
            }
            {/*                            /!*</div>*!/*/
            }

            {/*                            <h3 className={styles.productTitle} title={product.product_name}>*/
            }
            {/*                                {product.product_name}*/
            }
            {/*                            </h3>*/
            }

            {/*                            <div className={styles.ratingContainer}>*/
            }
            {/*                                <div className={styles.rating}>*/
            }
            {/*                                    <Image*/
            }
            {/*                                        src="/productBlock/rating-star.svg"*/
            }
            {/*                                        alt="Rating"*/
            }
            {/*                                        width={18}*/
            }
            {/*                                        height={18}*/
            }
            {/*                                        className={styles.ratingIcon}*/
            }
            {/*                                    />*/
            }
            {/*                                    <span className={styles.ratingText}>*/
            }
            {/*                                {product.rating.toFixed(1)}*/
            }
            {/*                            </span>*/
            }
            {/*                                </div>*/
            }
            {/*                                {product.review_count > 0 && (*/
            }
            {/*                                    <span className={styles.reviews}>*/
            }
            {/*                              • {product.review_count} отзыв{product.review_count === 1 ? '' : product.review_count < 5 ? 'а' : 'ов'}*/
            }
            {/*                            </span>*/
            }
            {/*                                )}*/
            }
            {/*                            </div>*/
            }
            {/*                        </div>*/
            }
            {/*                        <div className={styles.cardActions}>*/
            }
            {/*                            <button className={styles.addToCartButton}>Подробнее</button>*/
            }
            {/*                        </div>*/
            }
            {/*                    </Link>*/
            }
            {/*                </div>*/
            }
            {/*            ))}*/
            }
            {/*        </div>*/
            }

            {/*            {isLoadingMore && (*/
            }
            {/*                <Skeleton active paragraph={{rows: 3}}/>*/
            }
            {/*            )}*/
            }
            {/*    </>*/
            }

            {/*)}*/
            }
            <div ref={loadMoreRef} className={styles.loadMoreTrigger}/>
        </section>
    )
        ;
}

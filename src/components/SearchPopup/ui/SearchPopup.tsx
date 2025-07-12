'use client';

import styles from '../../Header/Header.module.scss';
import Link from 'next/link';

import clsx from "clsx";
import React, {Ref, useRef} from "react";
import Image from "next/image";
import {Product} from "@/app/globalRedux/model/caterogy/category.type";
import Loader from '../../../../public/icons/loader.svg'
import {SearchResponse} from "@/app/globalRedux/model/product/product.type";
import {a} from "next-international/dist/types-wFm7okgu";

interface Props {
    searchData: SearchResponse | undefined;
    closePopup: () => void;
    products: Product[];
    isSearchActive: boolean
    isLoading: boolean
    popupRef: Ref<HTMLDivElement> | undefined

}

export const SearchPopup = ({closePopup, searchData, popupRef, isLoading, products, isSearchActive,}: Props) => {

    return (
        <div ref={popupRef} className={clsx([styles.searchPopup], {[styles.isSearchActive]: isSearchActive})}>

            <div>
                <div className={styles.searchBox}>
                    <div className={styles.popupTitle}>
                        <img src="/popup/icons/search.svg" width="24" height="24" alt="Search Icon"/>
                        История поиска
                    </div>
                    {isLoading ? (
                        <div className={styles.loaderContainer}>
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
                    ) : products && products?.length > 0 ? (
                        <div className={styles.productsBox}>
                            {
                                products?.map((product) => (
                                    <Link
                                        key={product.product_id}
                                        href={`/product-page/${product.product_id}`}
                                        className={styles.cardLink}>
                                        <div className={styles.imageContainer}>
                                            {product.main_image ? (
                                                <Image
                                                    src={product.main_image}
                                                    alt={product.product_name}
                                                    width={92}
                                                    height={100}
                                                    className={styles.productImage}
                                                />
                                            ) : (
                                                <div className={styles.imagePlaceholder}>
                                                    Нет фото
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.productInfo}>
                                            <div className={styles.priceContainer}>
                                                  <span
                                                      className={`${styles.currentPrice} ${
                                                          false ? styles.discountedPrice : ""
                                                      }`}
                                                  >
                                                    {product.price.toLocaleString()} {product.currency}
                                                  </span>
                                            </div>


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
                                    </Link>
                                ))
                            }
                        </div>

                    ) : (
                        searchData === undefined
                            ? <div className={styles.emptyResult}></div> :
                            <div className={styles.emptyResult}>Ничего не найдено</div>
                    )}
                </div>
            </div>
        </div>
    );
};


{/*<Link href="/category" className={styles.popupLink}>Смартфоны*/
}
{/*    <img src="/popup/icons/arrow_r.svg"*/
}
{/*         width="24" height="24"*/
}
{/*         alt="Arrow Icon"/>*/
}
{/*</Link>*/
}
{/*<Link href="/category" className={styles.popupLink}>Телефоны*/
}
{/*    <img src="/popup/icons/arrow_r.svg"*/
}
{/*         width="24" height="24"*/
}
{/*         alt="Arrow Icon"/>*/
}
{/*</Link>*/
}
{/*<Link href="/category" className={styles.popupLink}>Аксессуары*/
}
{/*    <img src="/popup/icons/arrow_r.svg"*/
}
{/*         width="24" height="24"*/
}
{/*         alt="Arrow Icon"/>*/
}
{/*</Link>*/
}
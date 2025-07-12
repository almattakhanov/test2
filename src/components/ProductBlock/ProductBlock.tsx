'use client'

import styles from './ProductBlock.module.scss'
import Image from 'next/image'
import {ProductCard} from "@/src/components/ProductBlock/index"
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import {Mousewheel, Navigation, Pagination, Scrollbar} from 'swiper/modules'
import {Product} from "@/app/globalRedux/model/caterogy/category.type";
import Link from "next/link";
import Favorite from "../../../public/icons/favourite.svg";
import {useAuth} from "@/app/hook/useAuth";
import clsx from "clsx";
import {useFavoriteManager} from "@/app/hook/useFavoriteManager";
import {formatPrice} from "@/src/utils/helpers";

type ProductBlock = {
    title?: string
    productLength?: string
    productsData?: Product[]
}


export const ProductBlock = ({title, productLength, productsData}: ProductBlock) => {

    const {favoriteItems, toggleFavorite, getIsFavorite} = useFavoriteManager();


    const hasDiscount = (product: ProductCard): boolean => {
        return product.discount !== undefined && product.discount > 0
    }

    return (
        <section className={styles.productBlock}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                    {productLength && (
                        <span className={styles.productNumber}>{productLength} товаров</span>
                    )}
                </div>
                {
                    productsData &&
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, Mousewheel]}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            320: {slidesPerView: 1.2},
                            360: {slidesPerView: 1.5},
                            400: {slidesPerView: 1.8},
                            480: {slidesPerView: 2},
                            545: {slidesPerView: 2.3},
                            600: {slidesPerView: 2.5},
                            700: {slidesPerView: 2.8},
                            768: {slidesPerView: 3},
                            850: {slidesPerView: 3.3},
                            900: {slidesPerView: 3.5},
                            960: {slidesPerView: 3.8},
                            1024: {slidesPerView: 4},
                            1100: {slidesPerView: 4.3},
                            1200: {slidesPerView: 4.5},
                            1280: {slidesPerView: 5},
                            1366: {slidesPerView: 5.3},
                            1440: {slidesPerView: 6}
                        }}
                        className={styles.swiperContainer}
                    >
                        <>
                            {productsData.map((product) => (
                                <SwiperSlide key={product.product_id} className={styles.productCard}>
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
                                            <Image
                                                src={product.main_image}
                                                alt={product.product_name}
                                                width={207}
                                                height={200}
                                                className={styles.productImage}
                                            />
                                            {/*<div className={styles.installmentBadge}>Рассрочка 0•0•12</div>*/}

                                            {/*{product.isSale && (*/}
                                            {/*    <div className={styles.saleBadge}>Распродажа</div>*/}
                                            {/*)}*/}

                                            {/*{hasDiscount(product) && (*/}
                                            {/*    <div className={styles.discountBadge}>-{product.discount}%</div>*/}
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
                                            {/*      <span className={styles.installmentValue}>*/}
                                            {/*         {(product.price / 12).toFixed(0)}*/}
                                            {/*      </span>*/}
                                            {/*    <span className={styles.quantity}>× 12</span>*/}
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
                                    </Link>

                                </SwiperSlide>
                            ))}
                        </>
                    </Swiper>
                }
            </div>
        </section>
    )
}

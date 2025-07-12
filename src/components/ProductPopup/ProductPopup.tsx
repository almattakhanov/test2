'use client'

import styles from './ProductPopup.module.scss'
import Image from 'next/image'
import {ProductCard, products} from "@/src/components/ProductBlock/index"

type ProductPopup = {
    title?: string
    productLength?: string
}

export const ProductPopup = ({title, productLength}: ProductPopup) => {
    const toggleFavorite = (id: number) => {
        console.log(`Toggling favorite for product ${id}`)
    }

    const hasDiscount = (product: ProductCard): boolean => {
        return product.discount !== undefined && product.discount > 0
    }

    return (
        <section className={styles.productBlock}>
            <div className={styles.sectionHeader}>
                {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                {productLength && (
                    <span className={styles.productNumber}>{productLength} товаров</span>
                )}
            </div>

            <div className={styles.productsGrid}>
                {products.slice(0, 4).map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={207}
                                height={200}
                                className={styles.productImage}
                            />

                            <button
                                className={styles.favoriteButton}
                                onClick={() => toggleFavorite(product.id)}
                            >
                                <Image
                                    src={product.isFavorite ? "/productBlock/vectorTrue.svg" : "/productBlock/vector.svg"}
                                    alt={product.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                                    width={26}
                                    height={24}
                                    className={`${styles.favoriteIcon} ${product.isFavorite ? styles.favoriteActive : ''}`}
                                />
                            </button>

                            <div className={styles.installmentBadge}>Рассрочка 0•0•12</div>

                            {product.isSale && (
                                <div className={styles.saleBadge}>Распродажа</div>
                            )}

                            {hasDiscount(product) && (
                                <div className={styles.discountBadge}>-{product.discount}%</div>
                            )}
                        </div>

                        <div className={styles.productInfo}>
                            <div className={styles.priceContainer}>
                                <span
                                    className={`${styles.currentPrice} ${product.discount && product.discount > 0 ? styles.discountedPrice : ''}`}
                                >
                                    {product.price.toLocaleString()} с
                                </span>
                                {product.oldPrice !== undefined && product.oldPrice > product.price && (
                                    <span className={styles.oldPrice}>{product.oldPrice.toLocaleString()} с</span>
                                )}
                            </div>

                            <div className={styles.installment}>
                                <span className={styles.installmentValue}>{product.installment}</span>
                                <span className={styles.quantity}> {product.quantity}</span>
                            </div>

                            <h3 className={styles.productTitle} title={product.title}>
                                {product.title}
                            </h3>

                            <div className={styles.ratingContainer}>
                                <div className={styles.rating}>
                                    <Image
                                        src="/productBlock/rating-star.svg"
                                        alt="Rating star"
                                        width={18}
                                        height={18}
                                        className={styles.ratingIcon}
                                    />
                                    <span className={styles.ratingText}>
                                        {product.rating.toFixed(1)}
                                    </span>
                                </div>
                                <span className={styles.reviews}>• {product.reviews} отзывов</span>
                            </div>

                           
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
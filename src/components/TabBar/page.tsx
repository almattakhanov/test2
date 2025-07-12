'use client'

import styles from './TabBar.module.scss'
import Image from 'next/image'
import Link from "next/link";
import {Skeleton} from "antd";
import {useAuth} from "@/app/hook/useAuth";
import {useI18n} from "@/locales/client";
import {useGetCartQuery} from "@/app/globalRedux/model/cart/cart.api";
import {useFavoriteCount} from "@/app/hook/useFavoriteCount";
import {useCartManager} from "@/app/hook/useCartManager";

export default function TabBar() {
    const {isAuth, isLoading} = useAuth()

    const { cartItems, addItem, isInCart } = useCartManager(isAuth);

    const t = useI18n();
    // const {data: cart} = useGetCartQuery()
    // const cartTotalQuantity = cart?.data?.cart_total_quantity && cart?.data?.cart_total_quantity > 0 ? cart?.data.cart_total_quantity : undefined;
    const favoriteCount = useFavoriteCount();
    return (
        <div className="container">
            <section className={styles.mobileOnly}>
                <div className={styles.tabBar}>
                    <div className={styles.tabs}>
                        <Link href="/catalog" className={styles.tab}>
                            <Image src="/tabBar/menu_alt.svg" alt="Catalog" width={24} height={24}/>
                            <div className={styles.title}>Каталог</div>
                        </Link>

                        <Link href="/favorites" className={styles.tab}>
                            <Image src="/tabBar/heart.svg" alt="Favorites" width={24} height={24}/>
                            <div className={styles.title}>Избранное</div>
                            <div className={styles.counter}>
                                {favoriteCount > 0 && (
                                    <div className={styles.label}>{favoriteCount}</div>
                                )}
                            </div>
                        </Link>

                        <Link href="/cart-page" className={styles.tab}>
                            <Image src="/tabBar/shopping_cart.svg" alt="Cart" width={24} height={24}/>
                            <div className={styles.title}>Корзина</div>
                            <div className={styles.counter2}>
                                {!!cartItems.length && <div className={styles.label2}>{cartItems.length}</div>}
                                {/*{cartTotalQuantity && <div className={styles.label2}>{cartTotalQuantity}</div>}*/}
                            </div>
                        </Link>

                        {isLoading ? (
                            <div className={styles.tab}>
                                <Skeleton.Button
                                    active
                                    size="small"
                                    style={{
                                        width: 93,
                                        height: 62,
                                        verticalAlign: 'middle'
                                    }}
                                />
                            </div>
                        ) : isAuth ? (
                            <Link href='/account/profile' className={styles.tab}>
                                <Image src="/tabBar/user.svg" alt="Profile" width={24} height={24}/>
                                <div className={styles.title}>Профиль</div>
                            </Link>
                        ) : (
                            <Link href="/login" className={styles.tab}>
                                <Image
                                    src="/header/enterTwo.svg"
                                    alt="enter"
                                    width={24}
                                    height={24}
                                    className={styles.icon}
                                    style={{color: '#fff'}}
                                />
                                <div className={styles.favWrapper}>
                                    <span className={styles.title}> {t('login')}</span>
                                </div>
                            </Link>
                        )}

                    </div>

                    <div className={styles.homeIndicator}/>
                </div>
            </section>
        </div>
    )
}
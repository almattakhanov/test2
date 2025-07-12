'use client'

import styles from './Strocks.module.scss'
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {Autoplay} from 'swiper/modules'

export default function Stocks() {
    return (
        <div className={styles.banners}>

            <h2 className={styles.sectionTitle}>Акции от BakAi</h2>

            <div className={styles.sideBanners}>

                <div className={`${styles.sideBanner} ${styles.black}`}>
                    <div>
                        <h3 className={styles.sideTitle}>Акция на смартфоны</h3>
                        <p className={styles.sideText}>
                            При покупке смартфона<br/>
                            наушники в подарок
                        </p>
                    </div>
                    <button className={styles.smallButton}>Подробнее</button>
                    <Image
                        src="/presentation/original.png"
                        alt="Phone Promo"
                        width={153}
                        height={187}
                        className={styles.sideImage}
                    />
                </div>

                <div className={`${styles.sideBanner} ${styles.red}`}>
                    <div>
                        <h3 className={styles.sideTitle}>Акция на смартфоны</h3>
                        <p className={styles.sideText}>
                            При покупке смартфона<br/>
                            наушники в подарок
                        </p>
                    </div>
                    <button className={styles.smallButton}>Подробнее</button>
                </div>

                <div className={`${styles.sideBanner} ${styles.blue}`}>
                    <div>
                        <h3 className={styles.sideTitle}>Акция на смартфоны</h3>
                        <p className={styles.sideText}>
                            При покупке смартфона<br/>
                            наушники в подарок
                        </p>
                    </div>
                    <button className={styles.smallButton}>Подробнее</button>
                </div>
            </div>

            <div className={styles.mobile}>
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{delay: 5000}}
                >

                    <SwiperSlide>
                        <div className={`${styles.mobileBanner} ${styles.black}`}>
                            <div>
                                <h3 className={styles.mobileSideTitle}>Акция на смартфоны</h3>
                                <p className={styles.mobileSideText}>
                                    При покупке смартфона<br/>
                                    наушники в подарок
                                </p>
                            </div>
                            <button className={styles.mobileSmallButton}>Подробнее</button>
                            <Image
                                src="/presentation/original.png"
                                alt="Phone Promo"
                                width={153}
                                height={187}
                                className={styles.mobileSideImage}
                            />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.mobileBanner} ${styles.red}`}>
                            <div>
                                <h3 className={styles.mobileSideTitle}>Акция на смартфоны</h3>
                                <p className={styles.mobileSideText}>
                                    При покупке смартфона<br/>
                                    наушники в подарок
                                </p>
                            </div>
                            <button className={styles.mobileSmallButton}>Подробнее</button>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`${styles.sideBanner} ${styles.blue}`}>
                            <div>
                                <h3 className={styles.sideTitle}>Акция на смартфоны</h3>
                                <p className={styles.sideText}>
                                    При покупке смартфона<br/>
                                    наушники в подарок
                                </p>
                            </div>
                            <button className={styles.smallButton}>Подробнее</button>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

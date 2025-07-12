'use client'

import styles from './Presentation.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'

export default function Presentation() {
  return (
      <div className={styles.banners}>
        <div className="container">
          <div className={styles.desktop}>
            <div className={styles.mainBanner}>
              <div className={styles.content}>
                <div className={styles.titles}>
                  <h2 className={styles.title}>
                    Новый iPhone 16e<br/>
                    уже в продаже
                  </h2>
                  <p className={styles.subtitle}>Все что нужно!</p>
                </div>
                <button className={styles.button}>Подробнее</button>
              </div>
              <Image
                  src="/presentation/bigPhone.png"
                  alt="iPhone Banner"
                  width={431}
                  height={431}
                  className={styles.mainImage}
              />
            </div>

            <div className={styles.sideBanners}>
              <div className={`${styles.sideBanner} ${styles.black}`}>
                <div className={styles.sideContent}>
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
                <div className={styles.sideContent}>
                  <h3 className={styles.sideTitle}>Акция на смартфоны</h3>
                  <p className={styles.sideText}>
                    При покупке смартфона<br/>
                    наушники в подарок
                  </p>
                </div>
                <button className={styles.smallButton}>Подробнее</button>
              </div>
            </div>
          </div>

          <div className={styles.mobile}>
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                modules={[Autoplay]}
                autoplay={{delay: 5000}}
                breakpoints={{
                  320: {slidesPerView: 1.1, spaceBetween: 12},
                  360: {slidesPerView: 1.2, spaceBetween: 14},
                  400: {slidesPerView: 1.5, spaceBetween: 14},
                  480: {slidesPerView: 1.7, spaceBetween: 15},
                  545: {slidesPerView: 1.9, spaceBetween: 15},
                  600: {slidesPerView: 2.1, spaceBetween: 16},
                  768: {slidesPerView: 2.2, spaceBetween: 16}
                }}
            >
              <SwiperSlide>
                <div className={styles.mobileBanner}>
                  <div className={styles.mobileContent}>
                    <h2 className={styles.mobileTitle}>
                      Новый iPhone 16e<br/>
                      уже в продаже
                    </h2>
                    <p className={styles.mobileSubtitle}>Все что нужно!</p>
                  </div>
                  <button className={styles.mobileButton}>Подробнее</button>
                  <Image
                      src="/presentation/bigPhone.png"
                      alt="iPhone Banner"
                      width={124}
                      height={124}
                      className={styles.mobileImage}
                  />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={`${styles.mobileBanner} ${styles.black}`}>
                  <div className={styles.mobileContent}>
                    <h3 className={styles.mobileTitle}>Акция на смартфоны</h3>
                    <p className={styles.mobileSubtitle}>
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
                  <div className={styles.mobileContent}>
                    <h3 className={styles.mobileSideTitle}>Акция на смартфоны</h3>
                    <p className={styles.mobileSideText}>
                      При покупке смартфона<br/>
                      наушники в подарок
                    </p>
                  </div>
                  <button className={styles.mobileSmallButton}>Подробнее</button>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

  )
}
'use client'

import styles from './CategoryNav.module.scss'
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Grid, Navigation} from 'swiper/modules'

import {Button, Skeleton} from 'antd'
import Link from 'next/link'
import {useSwiperControls} from './swiperConfig'
import 'swiper/css'
import 'swiper/css/navigation'
import {useRef} from "react";
import ArrowRight from '@/public/icons/arrow_r_swiper.svg'
import ArrowLeft from '@/public/icons/arrow_l_swiper.svg'
import CatalogBtn from '@/public/icons/category-arrow.svg'
import './swiperGrid.css';

import {
    useGetCategoryFirstLevelQuery,
} from "@/app/globalRedux/model/caterogy/category.api";
import clsx from "clsx";


export default function CategoryNav() {
    const {
        swiperRef,
        isBeginning,
        isEnd,
        navigationProps
    } = useSwiperControls()

    const prevRef = useRef<HTMLButtonElement | null>(null)
    const nextRef = useRef<HTMLButtonElement | null>(null)

    const {data, isLoading} = useGetCategoryFirstLevelQuery()

    const categories = data?.data


    const skeletonCount = 12

    return (
        <div className={styles.menuWrapper}>
            <div className={styles.container}>
                <div className={styles.swiperContainer}>

                    <div className={styles.navButtons}>
                        <button ref={prevRef} className={`${styles.navPrev} ${isBeginning ? styles.hidden : ''}`}
                                disabled={isBeginning}>
                            <ArrowLeft/>
                        </button>
                        <button ref={nextRef} className={`${styles.navNext} ${isEnd ? styles.hidden : ''}`}
                                disabled={isEnd}>
                            <ArrowRight/>
                        </button>
                    </div>

                    <Swiper
                        modules={[Grid, Navigation]}
                        spaceBetween={12}
                        slidesPerView={'auto'}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                grid: {rows: 2},
                                spaceBetween: 5
                            },
                            340: {
                                slidesPerView: 3.1,
                                grid: {rows: 2},
                                spaceBetween: 5
                            },
                            426: {
                                slidesPerView: 4,
                                grid: {rows: 2},
                                spaceBetween: 12
                            },
                            660: {
                                slidesPerView: 5,
                                grid: {rows: 2},
                                spaceBetween: 12
                            },
                            768: {
                                slidesPerView: 6,
                                grid: {rows: 2},
                                spaceBetween: 12
                            },
                            910: {
                                slidesPerView: 7,
                                grid: {rows: 2},
                                spaceBetween: 12
                            },
                            1200: {
                                slidesPerView: 8,
                                grid: {rows: 2},
                                spaceBetween: 12
                            },
                            1440: {
                                slidesPerView: 9.5,
                                grid: {rows: 2},
                                spaceBetween: 12
                            },

                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        grid={{
                            rows: 2,
                        }}
                        className={styles.gridSlider}
                        onBeforeInit={(swiper) => {
                            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                                swiper.params.navigation.prevEl = prevRef.current
                                swiper.params.navigation.nextEl = nextRef.current
                            }
                        }}
                        {...navigationProps}
                    >
                        <>
                            {isLoading
                                ? Array.from({length: skeletonCount}).map((_, idx) => (
                                    <SwiperSlide key={idx} className={styles.slide}>
                                        <div className={styles.category}>
                                            <Skeleton.Avatar active size={70} shape="square"/>
                                            <Skeleton.Input active style={{width: 70, marginTop: 8}}/>
                                        </div>
                                    </SwiperSlide>
                                ))
                                :
                                <>
                                    {categories?.map((cat, idx) => (
                                        <SwiperSlide key={idx} className={styles.slide}>
                                            <Link href={`/category/${cat.ID}`}
                                                  className={clsx(styles.category, {
                                                      [styles.disabledLink]: cat.is_active === false,
                                                  })}>
                                                <div className={styles.categoryIcon}>
                                                    {cat.IconURL ? (
                                                        <>
                                                            <Image
                                                                src={cat.IconURL}
                                                                alt={cat.Name}
                                                                width={70}
                                                                height={70}
                                                                className={clsx(styles.icon, {
                                                                    [styles.disabled]: cat.is_active === false,
                                                                })}
                                                            />
                                                        </>

                                                    ) : (
                                                        <div></div>
                                                    )}
                                                </div>
                                                <p className={styles.title}>{cat.Name}</p>
                                                {
                                                    cat.is_active === false &&
                                                    <span className={styles.notActive}>Скоро в продаже</span>
                                                }
                                            </Link>
                                        </SwiperSlide>
                                    ))
                                    }

                                    <SwiperSlide className={styles.slide}>
                                        <Link href={`/catalog`}
                                              className={styles.category}
                                        >
                                            <div
                                                className={styles.categoryIcon}
                                            >
                                                <Image
                                                    src={'/icons/category-arrow.svg'}
                                                    alt={'asd'}
                                                    width={80}
                                                    height={80}
                                                    className={styles.icon}
                                                />
                                            </div>
                                            <p className={styles.title}>В каталог</p>
                                        </Link>
                                    </SwiperSlide>
                                </>

                            }
                        </>
                    </Swiper>

                    <Link href={`/catalog`}>
                        <Button className={styles.catalogBtn}>Перейти в каталог</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

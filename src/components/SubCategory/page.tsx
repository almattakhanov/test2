'use client';

import React from 'react';
import {Button} from 'antd';

import 'swiper/css';

import styles from './SubCategory.module.scss';
import {Category} from "@/app/globalRedux/model/caterogy/category.type";
import {useRouter} from "next/navigation";
import {useCurrentLocale} from "@/locales/client";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/pagination';

type Props = {
    categories: Category[],
}

const SubCategory = ({categories}: Props) => {
    const router = useRouter();
    const locale = useCurrentLocale();

    const handleCategoryClick = (categoryId: number) => {
        router.push(`/${locale}/category/${categoryId}`);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.scrollContainer}>
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={30}
                    pagination={false}
                    className="mySwiper"
                >
                    {categories?.map((cat, index) => (
                        <SwiperSlide key={index} className={styles.slide}>
                            <Button
                                onClick={() => handleCategoryClick(cat.id)}

                                className={styles.categoryButton}>{cat.name}</Button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SubCategory;

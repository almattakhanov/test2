"use client";

import styles from "./SharesBlock.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { useGetBrandsQuery } from "@/app/globalRedux/model/caterogy/category.api";

export default function SharesBlock() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const { data, isLoading } = useGetBrandsQuery();

    const handleSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper;
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const getImageSource = (iconUrl: string) => {
        if (!iconUrl) {
            return "/default-brand-image.png";
        }

        if (iconUrl.startsWith("/")) {
            return iconUrl;
        }

        return iconUrl;
    };

    const skeletonCount = 4;

    return (
        <section className={styles.providers}>
            <div className="container">
                <div className={styles.swiperWrapper}>
                    <button
                        className={`${styles.swiperButtonPrev} ${isBeginning ? styles.hidden : ""}`}
                        onClick={handlePrev}
                    />

                    <Swiper
                        modules={[Pagination, Mousewheel, Keyboard]}
                        spaceBetween={24}
                        slidesPerView={2}
                        keyboard
                        breakpoints={{
                            360: { slidesPerView: 1.5 },
                            640: { slidesPerView: 2.5 },
                            1024: { slidesPerView: 4 },
                        }}
                        onInit={handleSwiper}
                        onSlideChange={() => {
                            const swiper = swiperRef.current;
                            if (swiper) {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }
                        }}
                        onFromEdge={() => {
                            const swiper = swiperRef.current;
                            if (swiper) {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }
                        }}
                        className={styles.mySwiper}
                    >
                        {isLoading || !data
                            ? Array.from({ length: skeletonCount }).map((_, idx) => (
                                <SwiperSlide key={idx} className={styles.category}/>
                            ))
                            : data.data.brands.map((brand) => (
                                <SwiperSlide key={brand.ID} className={styles.category}>
                                    <div className={styles.imageContainer}>
                                        <Image
                                            src={getImageSource(brand.LogoURL)}
                                            alt={brand.Name || "Brand"}
                                            width={253}
                                            height={107}
                                            className={styles.image}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                if (!target.src.endsWith("/default-brand-image.png")) {
                                                    target.src = "/default-brand-image.png";
                                                    target.onerror = null;
                                                }
                                            }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>

                    <button
                        className={`${styles.swiperButtonNext} ${isEnd ? styles.hidden : ""}`}
                        onClick={handleNext}
                    />
                </div>
            </div>
        </section>
    );
}

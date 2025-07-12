"use client"
import {useState} from 'react';
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import type {Swiper as SwiperClass} from 'swiper';


import styles from './PageSlider.module.scss'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';



//import './styles.css';

interface PageSliderProps {
    images?: string[];
}

export default function PageSlider({images}: PageSliderProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    return (

        <div className={styles.swiperContNew}>
            <Swiper
                direction="vertical"
                onSwiper={setThumbsSwiper}
                loop={false}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.prPagasw1}
            >
                {images?.map((url, index) => (
                    <SwiperSlide className={styles.prPagasw1Slade} key={index}>
                        <Image
                            className={styles.cover}
                            src={`/api/image-proxy?url=${encodeURIComponent(url)}`}
                            alt={`thumb-${index}`}
                            width={72}
                            height={88}
                            unoptimized
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                loop={false}
                spaceBetween={10}
                navigation={false}
                thumbs={{swiper: thumbsSwiper}}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.prPagasw2}
            >
                {/*<div className={styles.miniSwipBlock}>*/}
                    {images?.map((url, index) => {
                        const zoomProps = {
                            width: 348,
                            height: 422,
                            zoomWidth: 500,
                            img: `/api/image-proxy?url=${encodeURIComponent(url)}`,
                            scale: 1.5,
                            offset: { vertical: 0, horizontal: 10 }
                        };

                       return (
                            <SwiperSlide key={index}>
                                <Image
                                    className={styles.coverBid}
                                    src={`/api/image-proxy?url=${encodeURIComponent(url)}`}
                                    alt={`thumb-${index}`}
                                    width={348}
                                    height={422}
                                    unoptimized
                                />
                            {/*<div style={{zIndex: 100000}}>*/}
                            {/*    <ImageZoom*/}
                            {/*        src={`/api/image-proxy?url=${encodeURIComponent(url)}`}*/}
                            {/*        width={300}*/}
                            {/*        height={300}*/}
                            {/*        magnifierSize={100}*/}
                            {/*        zoomLevel={1.5}*/}
                            {/*        enabled={true}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            </SwiperSlide>
                        )
                    })}
                {/*</div>*/}
            </Swiper>
        </div>
    );
}

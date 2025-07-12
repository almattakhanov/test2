'use client'

import s from './SingleBanner.module.scss'
import Image from 'next/image'

export default function SingleBanner() {
    return (
        <section className={s.bannerContainer}>
            <div className="container">
                <div className={s.content}>
                    <div className={s.textBlock}>
                        <h3 className={s.title}>Акция на смартфоны</h3>
                        <p className={s.subTitle}>При покупке смартфона наушники в подарок</p>
                        <a className={s.button} href="#">Подробнее</a>
                    </div>
                    <div className={s.bannerImage}>
                        <span className={s.gradient}></span>
                        <Image
                            src="/singleBanner/single-banner.png"
                            alt="Banner"
                            fill
                            className={s.bannerImage}
                        />
                    </div>
                </div>
            </div>

        </section>
    )
}

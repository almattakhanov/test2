'use client'

import React from 'react'
import styles from './TabReviews.module.scss'
import {Checkbox, Rate} from 'antd'
import Image from 'next/image'
import {Feedback} from '@/src/components/ProductTabs/tabs/TabReviews/Feedback/ui/Feedback'
import {items} from "@/src/components/ProductTabs/tabs/TabReviews/items";


export const TabReviews = () => {
    return (
        <div className={styles.wrapper}>
            <p>Нет отзывов</p>

            {/*<div className={styles.ratingContainer}>*/}
            {/*    <div className={styles.ratingWrapper}>*/}
            {/*        <div className={styles.rating}>*/}
            {/*            <Rate count={1} defaultValue={1}/>*/}
            {/*            <p>5,0</p>*/}
            {/*        </div>*/}
            {/*        <span>•12 отзывов</span>*/}
            {/*    </div>*/}
            {/*    <div className={styles.ratingFilter}>*/}
            {/*        <button className={styles.filter}>*/}
            {/*            <Image*/}
            {/*                src="/icons/filter.svg"*/}
            {/*                alt="filter"*/}
            {/*                width={24}*/}
            {/*                height={24}*/}
            {/*                style={{objectFit: 'contain'}}*/}
            {/*            />*/}
            {/*            <p>Новые</p>*/}
            {/*        </button>*/}

            {/*        <div className={styles.filterPhoto}>*/}
            {/*            <Checkbox onChange={() => {*/}
            {/*            }}>*/}
            {/*                <span className={styles.text}>Только с фото или видео</span>*/}
            {/*            </Checkbox>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={styles.line}></div>*/}
            {/*</div>*/}

            {/*{items.map((review, index) => (*/}
            {/*    <React.Fragment key={index}>*/}
            {/*        <Feedback {...review} />*/}
            {/*        {index < items.length - 1 && <div className={styles.lineMargin}></div>}*/}
            {/*    </React.Fragment>*/}
            {/*))}*/}
        </div>
    )
}

import React from 'react';
import styles from './Favorites.module.scss';
import Link from "next/link";
import Image from "next/image";
import {FavoritesGrid} from "@/src/components/Favorites/FavoritesGrid/ui/FavoritesGrid";


export const Favorites = () => (
    <div className={styles.wrapper}>
        <Link
            href="/"
            className={styles.titleLink}
            aria-label="На главную"
        >
            <div className={styles.titleContainer}>
                <Image
                    src="/order/arrow_back.svg"
                    width={24}
                    height={24}
                    alt="arrow_back"
                    aria-hidden="true"
                    className={styles.backIcon}
                />
                <h1 className={styles.pageTitle}>Избранное</h1>
            </div>
        </Link>
        <FavoritesGrid/>
    </div>
);

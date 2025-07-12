'use client'

import {Header} from "@/src/components/Header/page";

import {Footer} from "@/src/components/Footer/ui/Footer";
import React from "react";
import styles from './Offer.module.scss';
import {useI18n} from "@/locales/client";

const Page = () => {
    const t = useI18n();

    return (
        <>
            <div className='container'>
                <Header />
                <main className={styles.main}>
                    <h1 className={styles.title}>{t('about.title')}</h1>

                    <p className={styles.paragraph}>
                        <strong>Bakai Store</strong> — {t('about.intro')}
                    </p>

                    <h2 className={styles.subtitle}>{t('about.missionTitle')}</h2>
                    <p className={styles.paragraph}>{t('about.missionText')}</p>

                    <h2 className={styles.subtitle}>{t('about.goalTitle')}</h2>
                    <p className={styles.paragraph}>{t('about.goalText')}</p>

                    <h2 className={styles.subtitle}>{t('about.valuesTitle')}</h2>
                    <p className={styles.paragraph}>{t('about.valuesText')}</p>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Page;
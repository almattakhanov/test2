'use client';

import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import React from "react";
import styles from './PlaceOrder.module.scss';
import {useI18n} from "@/locales/client";

const Page = () => {
    const t = useI18n();

    return (
        <>
            <div className='container'>
                <Header />
                <main className={styles.main}>
                    <h1 className={styles.title}>{t('placeOrder.title')}</h1>
                    <ul className={styles.steps}>
                        <li>
                            <strong>{t('placeOrder.steps.registration.title')}</strong>
                            {t('placeOrder.steps.registration.description')}
                        </li>
                        <li>
                            <strong>{t('placeOrder.steps.selection.title')}</strong>
                            {t('placeOrder.steps.selection.description')}
                        </li>
                        <li>
                            <strong>{t('placeOrder.steps.checkout.title')}</strong>
                            {t('placeOrder.steps.checkout.description')}
                        </li>
                        <li>
                            <strong>{t('placeOrder.steps.delivery.title')}</strong>
                            {t('placeOrder.steps.delivery.description')}
                        </li>
                    </ul>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Page;
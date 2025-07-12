'use client'

import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import React from "react";
import styles from './AboutUs.module.scss';
import {useI18n} from "@/locales/client";

const Page = () => {
    const t = useI18n();

    return (
        <>
            <div className='container'>
                <Header />
                <main className={styles.main}>
                    <h1 className={styles.title}>{t('payment.title')}</h1>
                    <ul className={styles.sectionList}>
                        <li>
                            <strong>{t('payment.methods.cardOrCash.title')} <br/> </strong>
                            {t('payment.methods.cardOrCash.description')}
                        </li>
                        <li>
                            <strong>{t('payment.methods.installment.title')} <br/> </strong>
                            {t('payment.methods.installment.description')}
                        </li>
                    </ul>

                    <h2 className={styles.subtitle}>{t('delivery.title')}</h2>
                    <ul className={styles.sectionList}>
                        <li>
                            <strong>{t('delivery.methods.pickup.title')}</strong><br />
                            {t('delivery.methods.pickup.description')}
                        </li>
                        <li>
                            <strong>{t('delivery.methods.shipping.title')}</strong><br />
                            {t('delivery.methods.shipping.description')}
                        </li>
                    </ul>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Page;
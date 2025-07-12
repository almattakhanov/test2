'use client'

import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import React from "react";
import styles from './return-policy.module.scss';
import {useI18n} from "@/locales/client";

const Page = () => {
    const t = useI18n();

    return (
        <>
            <div className='container'>
                <Header />
                <main className={styles.main}>
                    <h1 className={styles.title}>{t('exchangeReturn.title')}</h1>

                    <p className={styles.paragraph}>
                        {t('exchangeReturn.intro')}
                    </p>

                    <h2 className={styles.subtitle}>{t('exchangeReturn.goodQualityTitle')}</h2>
                    <p className={styles.paragraph}>
                        {t('exchangeReturn.goodQualityDescription')}
                    </p>
                    <ul className={styles.list}>
                        <li>{t('exchangeReturn.goodQualityConditions.notUsed')}</li>
                        <li>{t('exchangeReturn.goodQualityConditions.maintainedAppearance')}</li>
                        <li>{t('exchangeReturn.goodQualityConditions.hasSeals')}</li>
                        <li>{t('exchangeReturn.goodQualityConditions.hasProofOfPurchase')}</li>
                    </ul>
                    <p className={styles.paragraph}>
                        <strong>{t('exchangeReturn.nonReturnableTitle')}</strong><br/>
                        {t('exchangeReturn.nonReturnableDescription')}
                        <br />
                        {t('exchangeReturn.returnCondition')}
                    </p>

                    <h2 className={styles.subtitle}>{t('exchangeReturn.defectiveTitle')}</h2>
                    <p className={styles.paragraph}>
                        {t('exchangeReturn.defectiveDescriptionPart1')}<br />
                        {t('exchangeReturn.defectiveDescriptionPart2')}
                        <strong>{t('exchangeReturn.callCenterNumber')}</strong>.
                    </p>

                    <h2 className={styles.subtitle}>{t('exchangeReturn.cardPaymentTitle')}</h2>
                    <p className={styles.paragraph}>
                        {t('exchangeReturn.cardPaymentDescription')}
                    </p>
                    <ul className={styles.list}>
                        <li>{t('exchangeReturn.cardPaymentConditions.within14Days')}</li>
                        <li>{t('exchangeReturn.cardPaymentConditions.after14Days')}</li>
                    </ul>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Page;
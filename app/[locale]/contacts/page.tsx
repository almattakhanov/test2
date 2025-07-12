'use client'

import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import React from "react";
import styles from './contacts.module.scss';
import {useI18n} from "@/locales/client";

const Page = () => {
    const t = useI18n();

    return (
        <>

            <Header/>
            <main className={styles.main}>
                <div className='container'>
                    <h1 className={styles.title}>{t('contacts.title')}</h1>
                    <p className={styles.paragraph}>{t('contacts.description')}</p>
                    <p className={styles.paragraph}>
                        <strong>{t('contacts.workingHoursTitle')}</strong><br/>
                        {t('contacts.workingHours')}
                    </p>
                </div>
            </main>

            <Footer/>
        </>
    );
};

export default Page;
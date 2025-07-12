'use client'

import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import React from "react";
import styles from './rules-of-cooperation.module.scss';
import {useI18n} from "@/locales/client";
import Download from '../../../public/icons/download.svg'

import Link from 'next/link'

const Page = () => {
    const t = useI18n();

    return (
        <>
            <div className='container'>
                <Header />
                <main className={styles.main}>
                    <h1 className={styles.title}>{t('partnerAgreement.title')}</h1>

                    <p className={styles.paragraph}>{t('partnerAgreement.intro1')}</p>
                    <p className={styles.paragraph}>{t('partnerAgreement.intro2')}</p>

                    <p className={styles.paragraph}>
                        <Link
                            href="/documents/Договор Присоединения Bakai Store.docx"
                            download
                            className={styles.downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Download/>
                            {t('partnerAgreement.download')}
                        </Link>
                    </p>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Page;

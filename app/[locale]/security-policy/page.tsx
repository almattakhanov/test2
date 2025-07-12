'use client'

import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import React from "react";
import styles from './security-policy.module.scss';
import {useI18n} from "@/locales/client";

const Page = () => {
    const t = useI18n();

    return (
        <>
            <div className='container'>
                <Header/>
                <main className={styles.main}>
                    <h1 className={styles.title}>{t('infoSecurityPolicy.title')}</h1>

                    <p className={styles.paragraph}>{t('infoSecurityPolicy.intro')}</p>

                    {/* Section 1 */}
                    <h2>{t('infoSecurityPolicy.section1.title')}</h2>
                    <p>{t('infoSecurityPolicy.section1.intro')}</p>
                    <ul className="space-y-2 list-decimal pl-5">
                        <li>{t('infoSecurityPolicy.section1.1')}</li>
                        <li>{t('infoSecurityPolicy.section1.2')}</li>
                        <li>{t('infoSecurityPolicy.section1.3')}</li>
                        <li>{t('infoSecurityPolicy.section1.4')}</li>
                        <li>{t('infoSecurityPolicy.section1.5')}</li>
                        <li>{t('infoSecurityPolicy.section1.6')}</li>
                        <li>{t('infoSecurityPolicy.section1.7')}</li>
                    </ul>

                    {/* Section 2 */}
                    <h2 className={styles.subtitle}>{t('infoSecurityPolicy.section2.title')}</h2>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section2.1')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section2.2')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section2.3')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section2.4')}</p>

                    {/* Section 3 */}
                    <h2 className={styles.subtitle}>{t('infoSecurityPolicy.section3.title')}</h2>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section3.1')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section3.2')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section3.3')}</p>
                    <ul className={styles.list}>
                        <li>{t('infoSecurityPolicy.section3.3.1')}</li>
                        <li>{t('infoSecurityPolicy.section3.3.2')}</li>
                    </ul>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section3.4')}</p>


                    {/* Section 4 */}
                    <h2 className={styles.subtitle}>{t('infoSecurityPolicy.section4.title')}</h2>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section4.1')}</p>
                    <ul className={styles.list}>
                        <li>{t('infoSecurityPolicy.section4.1.1')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.2')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.3')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.4')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.5')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.6')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.7')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.8')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.9')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.10')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.11')}</li>
                        <li>{t('infoSecurityPolicy.section4.1.12')}</li>
                    </ul>

                    {/* Section 5 */}
                    <h2 className={styles.subtitle}>{t('infoSecurityPolicy.section5.title')}</h2>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section5.1')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section5.2')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section5.3')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section5.4')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section5.5')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section5.6')}</p>



                    {/* Section 6 */}
                    <h2 className={styles.subtitle}>{t('infoSecurityPolicy.section6.title')}</h2>

                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section6.1')}</p>
                    <ul>
                        <li className={styles.paragraph}>{t('infoSecurityPolicy.section6.1.1')}</li>
                        <li className={styles.paragraph}>{t('infoSecurityPolicy.section6.1.2')}</li>
                    </ul>

                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section6.2')}</p>
                    <ul>
                        <li className={styles.paragraph}>{t('infoSecurityPolicy.section6.2.1')}</li>
                        <li className={styles.paragraph}>{t('infoSecurityPolicy.section6.2.2')}</li>
                        <li className={styles.paragraph}>{t('infoSecurityPolicy.section6.2.3')}</li>
                        <li className={styles.paragraph}>{t('infoSecurityPolicy.section6.2.4')}</li>
                    </ul>

                    {/* Section 7 */}
                    <h2 className={styles.subtitle}>{t('infoSecurityPolicy.section7.title')}</h2>

                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section7.1')}</p>

                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section7.2')}</p>
                    <ul>
                        <li className={styles.paragraph}>{t('infoSecurityPolicy.section7.2.1')}</li>
                        <li className={styles.paragraph}>{t('infoSecurityPolicy.section7.2.2')}</li>
                        <li className={styles.paragraph}>{t('infoSecurityPolicy.section7.2.3')}</li>
                    </ul>

                    {/* Section 8 */}
                    <h2 className={styles.subtitle}>{t('infoSecurityPolicy.section8.title')}</h2>

                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section8.1')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section8.2')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section8.3')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section8.4')}</p>


                    {/* Section 9 */}
                    <h2 className={styles.subtitle}>{t('infoSecurityPolicy.section9.title')}</h2>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section9.1')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section9.2')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section9.3')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section9.4')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section9.5')}</p>
                    <p className={styles.paragraph}>{t('infoSecurityPolicy.section9.6')}</p>

                </main>
            </div>
            <Footer/>
        </>
    );
};

export default Page;
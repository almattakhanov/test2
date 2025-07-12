'use client'

import styles from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import {contacts, footerColumns, socialLinks} from './footerData'
import {useI18n} from "@/locales/client";

export const Footer = () => {
    const t = useI18n();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.logoBlock}>
                        <Image src="/footer/logo.svg" className={styles.footerLogo} alt="Bakai logo" width={157} height={50}/>

                        <div className={styles.contacts}>
                            {contacts.map(({href, icon, alt, labelKey}) => (
                                <a key={href} href={href} className={styles.contactLink}>
                                    <Image src={icon} alt={alt} width={24} height={24}/>
                                    {t(labelKey)}
                                </a>
                            ))}

                            <div className={styles.socials}>
                                {socialLinks.map(({href, icon, alt}) => (
                                    <Link key={alt} href={href}>
                                        <Image src={icon} alt={alt} width={48} height={48}/>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {footerColumns.map(({ titleKey, links }) => (
                        <div key={titleKey} className={styles.column}>
                            <h4>{t(titleKey)}</h4>
                            {links.map(({ href, labelKey }) => (
                                <Link key={labelKey} href={href}>
                                    {t(labelKey)}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

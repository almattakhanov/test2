'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import styles from './AccountLayout.module.scss'
import {ReactNode} from 'react'
import {Separator} from '@radix-ui/themes'
import {useMenuItems} from '@/app/[locale]/account/menuItems'
import {useLogout} from '@/app/hook/useLogout'
import Image from 'next/image'
import {useI18n} from '@/locales/client'

export default function AccountLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const currentSection = pathname.split('/').pop()
    const logout = useLogout()
    const t = useI18n()

    const menuItems = useMenuItems()

    return (
        <div className={styles.accountContainer}>
            <aside className={styles.sidebar}>
                <>
                    {menuItems.map(({ label, path, icon }) => (
                        <Link
                            key={path}
                            href={`/account/${path}`}
                            className={`${styles.menuItem} ${currentSection === path ? styles.active : ''}`}
                        >
                            <span className={styles.icon}>{icon}</span>
                            {label}
                        </Link>
                    ))}

                    <div>
                        <Separator
                            className={styles.separator}
                            orientation="horizontal"
                            size="2"
                        />
                    </div>

                    <button onClick={logout} className={styles.menuItem}>
                        <span className={styles.icon}>
                            <Image
                                src="/icons/log_out.svg"
                                alt=""
                                width={24}
                                height={24}
                                unoptimized
                            />
                        </span>
                        {t('logout') || 'Выйти из аккаунта'}
                    </button>
                </>
            </aside>
            <main className={styles.content}>{children}</main>
        </div>
    )
}

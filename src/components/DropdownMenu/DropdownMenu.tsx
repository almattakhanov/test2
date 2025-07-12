'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Separator } from '@radix-ui/themes'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import styles from './DropdownMenu.module.scss'

import { useI18n } from '@/locales/client'
import { useLogout } from '@/app/hook/useLogout'
import { MenuItem } from './MenuItem/MenuItem'
import { useGetUserQuery } from "@/app/globalRedux/model/user/user.api"
import { useProfileRedirect } from '@/app/hook/useProfileRedirect'
import { useMenuItems } from '@/app/[locale]/account/menuItems'  // <-- импортируем хук

export const UserDropdown = () => {

    const t = useI18n()
    const { data, isLoading } = useGetUserQuery()
    const pathname = usePathname()
    const logout = useLogout()
    const menuItems = useMenuItems()  // <-- вызов хука для меню

    const currentSection = pathname.split('/').pop()
    const topItems = menuItems.slice(0, 5)
    const bottomItems = menuItems.slice(5)

    useProfileRedirect(data?.data, isLoading)

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className={styles.trigger}>
                    <Image src="/icons/profile-icon.svg" alt="" width={20} height={20} />
                    <span className={styles.title}>{data?.data?.first_name}</span>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className={styles.content} sideOffset={20}>
                    {topItems.map((item) => (
                        <MenuItem key={item.path} {...item} currentSection={currentSection} />
                    ))}

                    <div>
                        <Separator
                            className={styles.separator}
                            orientation="horizontal"
                            size="2"
                        />
                    </div>

                    {bottomItems.map((item) => (
                        <MenuItem key={item.path} {...item} currentSection={currentSection} />
                    ))}

                    <button onClick={logout} className={styles.menuItem}>
                        <span className={styles.icon}>
                            <Image src="/icons/log_out.svg" alt="" width={24} height={24} unoptimized />
                        </span>
                        {t('logout')}
                    </button>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

import Image from 'next/image'
import { useI18n } from '@/locales/client'

export const useMenuItems = () => {
    const t = useI18n()

    return [
        {
            label: t('user.profileTitle') || 'Личные данные',
            path: 'profile',
            icon: <Image src="/icons/profile-icon.svg" alt="" width={24} height={24} unoptimized />
        },
        {
            label: t('orders.title') || 'Мои заказы',
            path: 'orders',
            icon: <Image src="/icons/shopping-basket.svg" alt="" width={24} height={24} unoptimized />
        },
        {
            label: t('address.myAddresses') || 'Мои адреса',
            path: 'addresses',
            icon: <Image src="/icons/location.svg" alt="" width={24} height={24} unoptimized />
        },
        // {
        //     label: t('security.title') || 'Безопасность',
        //     path: 'security',
        //     icon: <Image src="/icons/square-lock.svg" alt="" width={24} height={24} unoptimized />
        // },
        // {
        //     label: t('subscription.manage') || 'Управление подписками',
        //     path: 'subscription',
        //     icon: <Image src="/icons/subscription.svg" alt="" width={24} height={24} unoptimized />
        // },
    ]
}

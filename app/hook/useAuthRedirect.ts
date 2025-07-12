'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function useAuthRedirect() {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Получаем токен из localStorage
        const token = localStorage.getItem('access_token')

        const publicPaths = ['/login', '/register', '/confirm', '/login/confirm', '/register/confirm']

        // Убираем локаль из начала пути, если есть
        const pathnameWithoutLocale = pathname.replace(/^\/(ru|en|ky)/, '') || '/'

        const isPublicPage = publicPaths.some(
            path => pathnameWithoutLocale === path || pathnameWithoutLocale.startsWith(path + '/')
        )
        const isAuth = Boolean(token)


        if (isPublicPage && isAuth) {
            router.replace('/')
            return
        }

        if (!isPublicPage && !isAuth) {
            router.replace('/login')
            return
        }
    }, [pathname, router])
}

import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ru', 'ky'] as string[]

const I18nMiddleware = createI18nMiddleware({
    locales,
    defaultLocale: 'ru',
})

const PUBLIC_PATHS = [
    '/login',
    '/register',
    '/confirm',
    '/api',
    '/favicon.svg',
    '/robots.txt',
    '/static',
    '/_next',
]

export async function middleware(request: NextRequest) {
    const response = await I18nMiddleware(request)
    if (response) return response

    const { pathname } = request.nextUrl

    const token = request.cookies.get('access_token')?.value

    const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path))

    if (token && isPublicPath) {
        const url = new URL('/', request.url)
        return NextResponse.redirect(url)
    }

    // Если пользователь не залогинен и пытается зайти на приватную страницу — редирект на логин
    if (!token && !isPublicPath) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.svg|robots.txt).*)'],
}

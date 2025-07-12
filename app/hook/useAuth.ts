import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
    const router = useRouter()
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('access_token')
            setIsAuth(!!token)
            setIsLoading(false)
        }

        checkAuth()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'access_token') {
                checkAuth()
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    const login = (redirectPath: string = '/') => {
        router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`)
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        setIsAuth(false)
        router.push('/')
    }

    return {
        isAuth,
        isLoading,
        login,
        logout
    }
}

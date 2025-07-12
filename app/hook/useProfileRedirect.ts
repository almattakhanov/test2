'use client'

import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useGetUserQuery} from '@/app/globalRedux/model/user/user.api'
import {UserData} from "@/app/globalRedux/model/user/user.type";


export const useProfileRedirect = (userData?: UserData | null, isLoading?: boolean) => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        const alreadyRedirected = sessionStorage.getItem('redirected_to_profile')

        if (token && !isLoading && userData && !alreadyRedirected) {
            console.log('user first_name', userData.first_name)
            console.log('user last_name', userData.last_name)

            if (!userData.first_name?.trim() || !userData.last_name?.trim()) {
                sessionStorage.setItem('redirected_to_profile', 'true')
                router.push('/account/profile')
            }
        }
    }, [userData, isLoading, router])
}
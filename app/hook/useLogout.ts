'use client'

import { useRouter } from 'next/navigation'
import {AppDispatch} from "@/app/globalRedux/store";
import {useDispatch} from "react-redux";
import {baseApi} from "@/app/globalRedux/shared/api";

export const useLogout = () => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    return () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('auth')
        sessionStorage.clear()
        router.push('/login')

        dispatch(baseApi.util.resetApiState())
    }
}

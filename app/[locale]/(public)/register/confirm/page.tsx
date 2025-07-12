'use client'

import { useRouter } from 'next/navigation'
import { Button, Link } from '@radix-ui/themes'
import { useRef, useState, useEffect } from 'react'
import styles from './ConfirmPage.module.scss'
import {useAuthRedirect} from "@/app/hook/useAuthRedirect";
import {useVerifyOtpMutation} from "@/app/globalRedux/model/auth/api";



export default function ConfirmPage() {
    const router = useRouter()
    useAuthRedirect()


    const [code, setCode] = useState<string[]>(Array(6).fill(''))
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])
    const [token, setToken] = useState<string | null>(null)
    const [phone, setPhone] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [verifyOtp, { isLoading }] = useVerifyOtpMutation()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authData = localStorage.getItem('auth')
            if (authData) {
                const { temp_token, phone } = JSON.parse(authData)
                setToken(temp_token)
                setPhone(phone)
            } else {
                console.log('Данные не найдены в localStorage')
            }
        }
    }, [])

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return

        const updatedCode = [...code]
        updatedCode[index] = value
        setCode(updatedCode)

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    const handleSubmitCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const enteredCode = code.join('')
        if (!token || enteredCode.length < 6) return

        try {
            const res = await verifyOtp({ token, code: enteredCode }).unwrap()

            localStorage.setItem('access_token', res.data.jwt_token)
            localStorage.setItem('refresh_token', res.data.refresh_token)


            router.push('/')

        } catch (e: any) {
            console.error('Ошибка подтверждения:', e)
            setError('Неверный код. Попробуйте снова.')
        }
    }

    return (
        <div className={styles.card}>
            <form className={styles.form} onSubmit={handleSubmitCode}>
                <h1 className={styles.formTitle}>Регистранция</h1>

                <div className={styles.codeSentWrap}>
                    <p className={styles.codeSent}>
                        Код отправлен на номер {phone ? `${phone}` : 'не указан'}.
                    </p>
                    <Link href="/register" className={styles.editLink}>
                        Изменить
                    </Link>
                </div>

                <div className={styles.code}>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className={styles.otpInput}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => {
                                inputsRef.current[index] = el
                            }}
                        />
                    ))}
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <Button
                    className={`${styles.button} ${code.every((c) => c !== '') ? styles.buttonActive : ''}`}
                    size="3"
                    variant="solid"
                    type="submit"
                    disabled={code.some((c) => c === '') || isLoading}
                >
                    Подтвердить код
                </Button>
            </form>
        </div>
    )
}

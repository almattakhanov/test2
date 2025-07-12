'use client';

import {Button} from '@radix-ui/themes';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import styles from './RegisterPage.module.scss';
import {useRouter} from 'next/navigation';
import Link from "next/link";
import {InputMask} from "@react-input/mask";
import {PhoneFormData, phoneSchema} from "@/src/lib/validations/phone.validation";
import {useAuthRedirect} from "@/app/hook/useAuthRedirect";
import {usePostRegisterMutation} from "@/app/globalRedux/model/auth/api";
import {useEffect} from "react";
import {getPhoneFromStorage} from "@/src/lib/utils/getPhoneFromStorage";


export default function RegisterPage() {
    const router = useRouter();
    useAuthRedirect()
    const [postRegister, {isLoading, error}] = usePostRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue,
        watch,
        trigger,
    } = useForm({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phone: '',
        },
    });


    const phone = watch('phone');


    const onSubmit = async (data: PhoneFormData) => {
        const cleanedPhone = '+' + data.phone.replace(/\D/g, '');

        try {
            const response = await postRegister({phone: cleanedPhone}).unwrap();

            localStorage.setItem('auth', JSON.stringify({
                phone: response.data.phone,
                temp_token: response.data.temp_token,
            }));

            if (response.data.phone) {
                setValue('phone', response.data.phone);
            }

            router.push('/register/confirm');
        } catch (err) {
            console.error('Ошибка запроса:', err);
        }
    };

    useEffect(() => {
        const phoneFromStorage = getPhoneFromStorage();
        if (phoneFromStorage) {
            setValue('phone', phoneFromStorage);
            trigger('phone');
        }
    }, [setValue, trigger]);


    return (
        <div className={styles.card}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <h1 className={styles.formTitle}>Регистрация</h1>

                <div className={styles.inputWrap}>
                    <label className={styles.label}>Номер телефона</label>
                    <InputMask
                        {...register('phone')}
                        className={styles.input}
                        mask="+996 (__) ___ __ - __"
                        replacement={{_: /\d/}}
                        placeholder="+996 (XX) XXX XX - XX"
                        value={phone}
                        onChange={(e) => {
                            setValue('phone', e.target.value);
                            trigger('phone');
                        }}
                    />
                    {/* {errors.phone && <p className={styles.errorText}>{errors.phone.message}</p>} */}
                </div>

                <Button
                    className={`${styles.button} ${isValid ? styles.buttonActive : ''}`}
                    size="3"
                    variant="solid"
                    type="submit"
                    disabled={!isValid || isLoading}
                >
                    Зарегистрироваться
                </Button>

                {/*{error && <p className={styles.errorText}>Ошибка запроса: {error.message}</p>}*/}

                <div className={styles.linkWrap}>
                    <p className={styles.linkText}>Уже есть аккаунт?</p>
                    <Link href="/login" className={styles.link}>Войти</Link>
                </div>
            </form>
        </div>
    );
}

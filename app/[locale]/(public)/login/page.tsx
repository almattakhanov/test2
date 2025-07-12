'use client';

import React, {useEffect} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {Button, Separator} from '@radix-ui/themes';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {InputMask} from '@react-input/mask';

import styles from './LoginPage.module.scss';
import {useAuthRedirect} from '@/app/hook/useAuthRedirect';
import {usePostRegisterMutation} from '@/app/globalRedux/model/auth/api';
import {PhoneFormData, phoneSchema} from '@/src/lib/validations/phone.validation';
import {getPhoneFromStorage} from "@/src/lib/utils/getPhoneFromStorage";
import {formatToMask} from "@/src/utils/helpers";
import {Input} from "antd";
import {formatKyrgyzPhone} from "@/src/components/OrderPage/Checkout/ui/CheckoutForm";

export default function LoginPage() {
    useAuthRedirect();

    const router = useRouter();

    const searchParams = useSearchParams();
    const redirectParam = searchParams.get("redirect");


    const [postRegister] = usePostRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: {isValid},
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

            localStorage.setItem(
                'auth',
                JSON.stringify({
                    phone: response.data.phone,
                    temp_token: response.data.temp_token,
                })
            );

            if (redirectParam) {
                router.push(`/login/confirm?redirect=${encodeURIComponent(redirectParam)}`);
            } else {
                router.push('/login/confirm');
            }
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
                <h1 className={styles.formTitle}>Авторизация</h1>

                <div className={styles.inputWrap}>
                    <label className={styles.label}>Номер телефона</label>
                    <Input
                        {...register("phone")}
                        value={phone}
                        onChange={(e) => {
                            const formatted = formatKyrgyzPhone(e.target.value);
                            setValue("phone", formatted);
                            trigger("phone");
                        }}
                        onPaste={(e) => {
                            e.preventDefault();
                            const pasted = e.clipboardData.getData("text");
                            const formatted = formatKyrgyzPhone(pasted);
                            setValue("phone", formatted);
                            trigger("phone");
                        }}
                        className={styles.input}
                        placeholder="+996 (ХХХ) ХХ-ХХ-ХХ"
                    />
                    {/*<InputMask*/}
                    {/*    {...register('phone')}*/}
                    {/*    className={styles.input}*/}
                    {/*    mask="+996 (___) __-__-__"*/}
                    {/*    replacement={{ _: /\d/ }}*/}
                    {/*    placeholder="+996 (XXX) XX-XX-XX"*/}
                    {/*    value={phone}*/}
                    {/*    onChange={(e) => {*/}
                    {/*        setValue('phone', e.target.value);*/}
                    {/*        trigger('phone');*/}
                    {/*    }}*/}
                    {/*    onPaste={(e) => {*/}
                    {/*        e.preventDefault();*/}
                    {/*        const pasted = e.clipboardData.getData('text');*/}

                    {/*        // Очищаем всё кроме цифр*/}
                    {/*        const digits = pasted.replace(/\D/g, '');*/}

                    {/*        // Удаляем +996 если есть*/}
                    {/*        const cleaned = digits.startsWith('996') ? digits.slice(3) : digits;*/}

                    {/*        // Вставим только оставшиеся цифры вручную*/}
                    {/*        const final = cleaned.slice(0, 9); // 9 цифр после +996*/}
                    {/*        const formatted = formatToMask(final); // форматируем вручную*/}

                    {/*        setValue('phone', formatted);*/}
                    {/*        trigger('phone');*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/* {errors.phone && <p className={styles.errorText}>{errors.phone.message}</p>} */}
                </div>

                <Button
                    className={`${styles.button} ${isValid ? styles.buttonActive : ''}`}
                    size="3"
                    variant="solid"
                    type="submit"
                    disabled={!isValid}
                >
                    Войти
                </Button>

                {/*<div className={styles.linkWrap}>*/}
                {/*    <Separator orientation="horizontal" size="2" style={{flexGrow: 1}}/>*/}
                {/*    <p>Или войти через</p>*/}
                {/*    <Separator orientation="horizontal" size="2" style={{flexGrow: 1}}/>*/}
                {/*</div>*/}

                {/*<div className={styles.buttonWrap}>*/}
                {/*    <button className={styles.buttonChoice}>*/}
                {/*        <Image*/}
                {/*            src="/login/bakai_btn.svg"*/}
                {/*            alt="Bakai Bank"*/}
                {/*            width={120}*/}
                {/*            height={36.6}*/}
                {/*            style={{objectFit: 'contain'}}*/}
                {/*        />*/}
                {/*    </button>*/}
                {/*    <button className={styles.buttonChoice}>Qr-code</button>*/}
                {/*</div>*/}

                <div className={styles.linkWrap}>
                    <p className={styles.linkText}>У вас нет аккаунта?</p>
                    <Link href="/register" className={styles.link}>
                        Зарегистрироваться
                    </Link>
                </div>
            </form>
        </div>
    );
}

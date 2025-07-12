'use client'

import React, {useEffect, useRef, useState} from 'react';

import {Button, Input} from "antd";
import styles from './Payment.module.scss'
import {useGetUserQuery} from "@/app/globalRedux/model/user/user.api";
import {
    ConfirmPaymentRequest,
    ConfirmPaymentStatus,
    CreatePaymentRequest
} from "@/app/globalRedux/model/payment/payment.type";
import {useConfirmPaymentMutation, useCreatePaymentMutation} from "@/app/globalRedux/model/payment/payment.api";
import {useNotify} from "@/app/hook/useNotify";
import clsx from "clsx";
import CancelCircle from '../../../../public/icons/cancel-circle.svg'
import CheckmarkCircleTrue from '../../../../public/icons/checkmark-circle-true.svg'
import ArrowLeft from '../../../../public/icons/arrow_l.svg'
import {useRouter} from "next/navigation";
import {formatKyrgyzPhone} from "@/src/components/OrderPage/Checkout/ui/CheckoutForm";


export default function Page() {
    const router = useRouter();
    const {notify, contextHolder} = useNotify();
    const [code, setCode] = useState<string[]>(Array(6).fill(''))
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [phone, setPhone] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(0);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const [paymentId, setPaymentId] = useState<number | null>(null);
    const [orderNumber, setOrderNumber] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<ConfirmPaymentStatus | null>(null);
    const {data: userData} = useGetUserQuery();
    const [createPayment, {isLoading}] = useCreatePaymentMutation();
    const [confirmPayment, {isLoading: isConfirmPaymentLoading}] = useConfirmPaymentMutation();

    // Предзаполнение телефона из профиля
    useEffect(() => {
        if (userData?.data?.phone_number) {
            const formatted = formatKyrgyzPhone(userData.data.phone_number);
            setPhone(formatted);
        }
    }, [userData]);

    // Загрузка данных из sessionStorage
    useEffect(() => {
        const stored = sessionStorage.getItem("orderData");
        if (!stored) return;

        try {
            const order = JSON.parse(stored);
            setOrderId(order.id);
            setOrderNumber(order.order_number);
            setAmount(order.total_amount);
        } catch (e) {
            console.error("Ошибка парсинга orderData:", e);
        }
    }, []);

    useEffect(() => {
        if (step === 2) {
            inputsRef.current[0]?.focus();
        }
    }, [step]);

    // Отсчёт таймера 2 минуты
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handlePay = async () => {
        if (!orderId || !orderNumber || !phone) return;

        const phoneDigits = phone.replace(/\D/g, "");

        const payload: CreatePaymentRequest = {
            order_id: orderId,
            order_number: orderNumber,
            //order_number: orderNumber.replace("ORD-", ""),
            //  phone_number: '996556666992',
            phone_number: phoneDigits
        };

        try {
            const response = await createPayment(payload).unwrap();
            if (response.success && response.data?.payment_id) {
                setPaymentId(Number(response.data.payment_id));
                setCountdown(120);
                setStep(2);
            } else {
                console.error("Ошибка при создании оплаты:", response.error);
            }
        } catch (error: any) {
            console.error("Ошибка запроса createPayment:", error);
            const rawMessage = error?.data?.data?.message;
            let detail = "Произошла ошибка при оплате";

            try {
                const innerJson = rawMessage?.split("Message: ")[1];
                if (innerJson) {
                    const parsed = JSON.parse(innerJson);
                    if (parsed?.detail) {
                        if (Array.isArray(parsed.detail)) {
                            detail = parsed.detail
                                .map((d: any) => d?.msg)
                                .filter(Boolean)
                                .join("; ");
                        } else if (typeof parsed.detail === "string") {
                            detail = parsed.detail;
                        } else {
                            detail = JSON.stringify(parsed.detail);
                        }
                    }
                }
            } catch (e) {
                console.warn("Не удалось распарсить сообщение ошибки", e);
            }

            notify.error(
                detail && typeof detail === "object"
                    ? JSON.stringify(detail)
                    : detail || "Произошла ошибка"
            );
        }
    };

    const handleConfirmOtp = async (code: string) => {
        if (!paymentId) return;

        const payload: ConfirmPaymentRequest = {
            payment_id: paymentId,
            otp_code: code
        };

        try {
            const response = await confirmPayment(payload).unwrap();
            const status = response?.data?.status;

            setPaymentStatus(status || null);

            if (!status) {
                setIsSuccess(false);
                setStep(3);
                return;
            }

            switch (status) {
                case "EXECUTED":
                    setIsSuccess(true);
                    setStep(3);
                    setTimeout(() => {
                        window.location.href = "/account/orders";
                    }, 3000);
                    sessionStorage.removeItem("checkoutPayload");
                    break;

                case "PROCESSING":
                    setIsSuccess(true);
                    setStep(3);
                    setTimeout(() => {
                        window.location.href = "/account/orders";
                    }, 3000);
                    sessionStorage.removeItem("checkoutPayload");
                    break;

                case "REJECTED":
                case "CANCELLED":
                    notify.error("Оплата отклонена или отменена");
                    setIsSuccess(false);
                    setStep(3);
                    setTimeout(() => {
                        window.location.href = "/order";
                    }, 3000);
                    break;

                case "WAITING":
                case "NEW":
                    notify.info("Платёж ожидает подтверждения. Попробуйте позже.");
                    setIsSuccess(false);
                    setStep(3);
                    setTimeout(() => {
                        window.location.href = "/order";
                    }, 3000);
                    break;

                default:
                    notify.error("Неизвестный статус оплаты");
                    setIsSuccess(false);
                    setStep(3);
                    setTimeout(() => {
                        window.location.href = "/order";
                    }, 3000);
                    break;
            }

        } catch (error: any) {
            console.error("Ошибка при подтверждении OTP:", error);

            const rawMessage = error?.data?.data?.message;
            let detail = "Произошла ошибка при оплате";

            try {
                const innerJson = rawMessage?.split("Message: ")[1];
                if (innerJson) {
                    const parsed = JSON.parse(innerJson);
                    if (parsed?.detail) detail = parsed.detail;
                }
            } catch (e) {
                console.warn("Не удалось распарсить сообщение ошибки", e);
            }

            notify.error(detail);
            setIsSuccess(false);
            setStep(3);
        } finally {
            sessionStorage.removeItem("orderData");
        }
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }

        const fullCode = updatedCode.join("");
        if (fullCode.length === 6 && updatedCode.every((char) => char !== "")) {
            handleConfirmOtp(fullCode);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    return (
        <>
            {contextHolder}
            <section className={styles.wrapper}>
                <div
                    className={clsx(styles.paymentContent, {
                        [styles.successTrue]: paymentStatus === "EXECUTED",
                        [styles.processing]: paymentStatus === "PROCESSING" || paymentStatus === "WAITING",
                        [styles.successFalse]: paymentStatus === "REJECTED" || paymentStatus === "CANCELLED",
                    })}
                >
                    {/* Стрелка "назад" для step 2 или step 3 при ошибке */}
                    {(step === 3 && isSuccess === false) && (
                        <button onClick={() => {
                            router.back();
                            // setStep(1);
                            // setOtp("");
                            // setCountdown(0);
                            // setIsSuccess(null);
                        }}
                                className={styles.backButton}>
                            <ArrowLeft/>
                        </button>
                    )}

                    {(step === 1 || step === 2) && <h3 className={styles.title}>Оплата</h3>}


                    {step === 1 && (
                        <div className={styles.content}>
                            <div className={styles.inputWrapper}>
                                <span className={styles.label}>Номер телефона</span>
                                <Input
                                    value={phone}
                                    onChange={(e) => {
                                        const formatted = formatKyrgyzPhone(e.target.value);
                                        setPhone(formatted);
                                    }}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        const pasted = e.clipboardData.getData('text');
                                        const formatted = formatKyrgyzPhone(pasted);
                                        setPhone(formatted);
                                    }}
                                    //className={styles.input}
                                    placeholder="+996 (ХХХ) ХХ-ХХ-ХХ"
                                />
                                {/*<Input*/}
                                {/*    value={'996556666992'}*/}
                                {/*    // value={phone}*/}
                                {/*    onChange={(e) => setPhone(e.target.value)}*/}
                                {/*    placeholder="+996 (ХХХ) ХХХ - ХХХ"*/}
                                {/*/>*/}
                            </div>
                            <div className={styles.info}>
                                <p className={styles.infoTitle}>Номер заказа</p>
                                <p className={styles.subTitle}>{orderNumber || "—"}</p>
                            </div>
                            <div className={styles.info}>
                                <p className={styles.infoTitle}>Стоимость</p>
                                <p className={styles.subTitle}>{amount.toLocaleString("ru-RU")} с</p>
                            </div>
                            <Button
                                disabled={isLoading}
                                className={styles.button}
                                onClick={handlePay} type="primary" loading={isLoading}>
                                Оплатить
                            </Button>
                            {/*<button className={styles.button} onClick={handlePay}>*/}
                            {/*    Оплатить*/}
                            {/*</button>*/}
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <div className={styles.codeSentWrap}>
                                <p className={styles.codeSent}>
                                    Код отправлен на номер {phone || "не указан"}.
                                </p>
                                {/*<Link href="/login" className={styles.editLink}>*/}
                                {/*    Изменить*/}
                                {/*</Link>*/}
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
                            <Button
                                onClick={() => setCountdown(120)}
                                disabled={countdown > 0}
                                className={styles.button}
                                type="primary"
                                loading={isConfirmPaymentLoading}
                            >
                                Получить код еще раз
                            </Button>
                            {/*<button*/}
                            {/*    className={styles.button}*/}
                            {/*    onClick={() => setCountdown(120)}*/}
                            {/*    disabled={countdown > 0}*/}
                            {/*>*/}
                            {/*    Получить код еще раз*/}
                            {/*</button>*/}

                            {countdown > 0 && !isConfirmPaymentLoading && (
                                <div>Получить код еще раз через {formatTime(countdown)}</div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className={styles.statusMessage}>
                            {paymentStatus === "EXECUTED" ? (
                                <>
                                    <CheckmarkCircleTrue/>
                                    <p>Оплата прошла успешно</p>
                                </>
                            ) : paymentStatus === "PROCESSING" ? (
                                <>
                                    <CheckmarkCircleTrue/>
                                    <p>Платёж находится в обработке</p>
                                </>
                            ) : (
                                <>
                                    <CancelCircle/>
                                    <p>Ошибка оплаты</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>

    );
}



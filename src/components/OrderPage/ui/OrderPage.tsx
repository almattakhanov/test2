'use client';

import React, {useEffect, useMemo, useState} from 'react';
import styles from './OrderPage.module.scss';
import {orderSummary} from "@/src/components/OrderPage";
import {Payment} from "@/src/components/OrderPage/Payment/ui/Payment";
import {OrderSummary, OrderSummaryProps} from "@/src/components/OrderPage/OrderSummary/ui/OrderSummary";
import {CheckoutForm} from "@/src/components/OrderPage/Checkout/ui/CheckoutForm";
import {useRouter} from 'next/navigation';
import Link from "next/link";
import {useGetCartQuery} from "@/app/globalRedux/model/cart/cart.api";
import {useCheckoutOrderMutation, useCreateOrderMutation} from "@/app/globalRedux/model/order/order.api";
import {OrderCheckoutRequest, OrderCreateItem, OrderCreateRequest} from "@/app/globalRedux/model/order/order.type";
import {useGetAddressQuery} from "@/app/globalRedux/model/address/address.api";
import {getMonthLabel} from "@/src/utils/helpers";
import {useNotify} from "@/app/hook/useNotify";

const OrderPage = () => {
    const router = useRouter();
    const {notify, contextHolder} = useNotify();

    const [checkoutOrder, {data: order}] = useCheckoutOrderMutation();
    const {data: userAddress} = useGetAddressQuery()

    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
        userAddress?.data?.find((a) => a.IsDefault)?.ID ?? userAddress?.data?.[0]?.ID ?? null
    );

    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');

    const paymentOptionsData = order?.data?.items[0]?.payment_options;
    const deliveryOptionsData = order?.data?.items[0]?.delivery_options;

    // Состояния оплаты
    const [selectedPaymentType, setSelectedPaymentType] = useState<string>('');
    const [selectedInstallmentTerm, setSelectedInstallmentTerm] = useState<string>('');

    // Состояния доставки
    const [selectedDeliveryType, setSelectedDeliveryType] = useState<string>('');
    const [selectedPickupPoint, setSelectedPickupPoint] = useState<string>('');

    const [createOrder, {isLoading: isCreating, error, isError,}] = useCreateOrderMutation();

    // Инициализация значений при загрузке данных
    useEffect(() => {
        if (!paymentOptionsData) return;

        if (paymentOptionsData.card?.is_active) setSelectedPaymentType('Card');
        else if (paymentOptionsData.installment?.is_active) setSelectedPaymentType('Installment');

        if (paymentOptionsData.installment?.is_active) {
            const terms = Object.keys(paymentOptionsData.installment.terms);
            if (terms.length > 0) {
                setSelectedInstallmentTerm(`${terms[0]}Months`);
            }
        }
    }, [paymentOptionsData]);

    useEffect(() => {
        if (!deliveryOptionsData) return;

        // Выбираем первый включенный способ доставки по умолчанию
        const enabledOption = deliveryOptionsData.find(opt => opt.enabled);
        if (enabledOption) {
            setSelectedDeliveryType(enabledOption.type); // "delivery" или "pickup"

            // Если pickup, выбираем первую точку самовывоза
            if (
                enabledOption.type === 'pickup' &&
                Array.isArray(enabledOption.pickup_points) &&
                enabledOption.pickup_points.length > 0
            ) {
                setSelectedPickupPoint(enabledOption.pickup_points[0].code);
            }
        }
    }, [deliveryOptionsData]);

    useEffect(() => {
        const stored = sessionStorage.getItem('checkoutPayload');
        if (!stored) {
            //  router.back(); // Если нет данных — уходим назад
            return;
        }

        const payload: OrderCheckoutRequest = JSON.parse(stored);

        const fetchOrder = async () => {
            try {
                await checkoutOrder(payload).unwrap();

            } catch (error) {
                console.error('Ошибка при оформлении заказа', error);
                router.back(); // Ошибка — уходим назад
            }
        };

        fetchOrder();

        // const handleUnload = () => {
        //     sessionStorage.removeItem('checkoutPayload');
        // };
        //
        // // При закрытии/обновлении страницы
        // window.addEventListener('beforeunload', handleUnload);

        // При переходе по навигации
        return () => {
            // handleUnload();
            // router.back();
        };
    }, [checkoutOrder, router]);


    function formatCurrency(value: number): string {
        return value.toLocaleString("ru-RU") + "";
    }

    const summary = useMemo(() => {
        if (!order?.data) return null;

        const {
            cart_total_price,
            cart_total_discount_price,
            cart_total_quantity,
        } = order.data;

        const final = cart_total_price - cart_total_discount_price;

        const deliveryOption = order.data.items[0]?.delivery_options?.find(
            opt => opt.enabled && opt.type === selectedDeliveryType
        );
        const deliveryPrice = deliveryOption?.price ?? 0;

        const totalWithDelivery = final + deliveryPrice;

        let months = 0;
        let monthly = 0;

        if (selectedPaymentType === 'Installment' || selectedPaymentType === 'Credit') {
            months = parseInt(selectedInstallmentTerm.replace('Months', ''), 10);

            if (months > 0) {
                monthly = Math.ceil(totalWithDelivery / months);
            }
        }

        const totalByMonthly = months > 0 ? monthly * months : totalWithDelivery;

        const readableTerm =
            months > 0
                ? `${selectedPaymentType === 'Credit' ? 'Кредит' : 'Рассрочка'} на ${months} ${getMonthLabel(months)}`
                : undefined;

        return {
            total: formatCurrency(cart_total_price),
            discount: formatCurrency(cart_total_discount_price),
            delivery: deliveryPrice === 0
                ? 'Бесплатно'
                : `${formatCurrency(deliveryPrice)} c`,
            final: formatCurrency(totalWithDelivery),
            monthly: formatCurrency(monthly),
            totalByMonthly: formatCurrency(totalByMonthly),
            count: cart_total_quantity,
            paymentType: selectedPaymentType,
            installmentTerm: readableTerm,
        };
    }, [
        order,
        selectedDeliveryType,
        selectedPaymentType,
        selectedInstallmentTerm,
    ]);


    const handleCheckout = async () => {

        const stored = sessionStorage.getItem("checkoutPayload");
        if (!stored || !order?.data) return;

        if (selectedDeliveryType === 'delivery' && !selectedAddressId) {
            notify.info('Пожалуйста, выберите адрес доставки');
            return;
        }

        if (!firstName?.trim()) {
            notify.info('Пожалуйста, введите имя');
            return;
        }

        if (!phone?.trim()) {
            notify.info('Пожалуйста, введите телефон');
            return;
        }

        const payload: OrderCheckoutRequest = JSON.parse(stored);

        const orderData = order.data;
        const cartItems = orderData.items;

        // Сопоставим товары
        const items: OrderCreateItem[] = cartItems.map((item) => {
            const deliveryType = selectedDeliveryType === "delivery" ? {
                address_id: selectedAddressId ? selectedAddressId : undefined
            } : {
                pickup_point_id: selectedPickupPoint ? +selectedPickupPoint : undefined
            };

            return {
                product_id: item.product_id,
                company_product_id: item.company_product_id,
                company_id: item.company_id,
                name: item.product_name,
                quantity: item.quantity,
                unit_price: item.price,
                discount_amount: item.discount_percent,
                total_price: item.total_price,
                delivery_info: {
                    delivery_type_id: item?.delivery_options?.find(opt => opt.type === selectedDeliveryType)?.delivery_type_id ?? 0,
                    ...deliveryType
                }
            };
        });

        const request: OrderCreateRequest = {
            items,
            discount_percent: orderData.cart_total_discount,
            discount_amount: orderData.cart_total_discount_price,
            total_amount: 10,
            //  total_amount: orderData.cart_total_price,
            payable_amount: orderData.cart_total_price,
            payment_type: selectedPaymentType.toLowerCase() as "card" | "installment" | "credit"
        };
        try {

            const response = await createOrder(request).unwrap();
            notify.success('Успешно');
            // Сохрани данные для оплаты
            sessionStorage.setItem("orderData", JSON.stringify(response.data));

            router.push("/payment");
        } catch (err: any) {
            notify.error(err.data.data.message);
            console.error("Ошибка при создании заказа:", err.data.data.message);
        }
    };


    if (!order || !summary) return <div>Загрузка...</div>;

    return (
        <>
            {contextHolder}
            <div className={styles.cartWrapper}>
                <button onClick={() => router.back()}>
                    {/*<Link href="/account/orders">*/}
                    <h2 className={styles.title}>
                        <div
                            className={styles.backButton}
                        >
                            <img
                                className={styles.titleIcon}
                                src="/order/arrow_back.svg"
                                width="24"
                                height="24"
                                alt="Arrow Icon"
                            />
                        </div>
                        Оформление заказа
                    </h2>
                    {/*</Link>*/}
                </button>

                <div className={styles.cartContent}>
                    <div className={styles.cartItems}>
                        {paymentOptionsData && (
                            <Payment
                                paymentOptionsData={paymentOptionsData}
                                paymentType={selectedPaymentType}
                                onPaymentTypeChange={setSelectedPaymentType}
                                installmentTerm={selectedInstallmentTerm}
                                onInstallmentTermChange={setSelectedInstallmentTerm}
                            />
                        )}
                        <CheckoutForm
                            deliveryOptions={deliveryOptionsData}
                            deliveryType={selectedDeliveryType}
                            onDeliveryTypeChange={setSelectedDeliveryType}
                            pickupPoint={selectedPickupPoint}
                            onPickupPointChange={setSelectedPickupPoint}
                            userAddresses={userAddress?.data ?? []}
                            selectedAddressId={selectedAddressId!}
                            setSelectedAddressId={setSelectedAddressId}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            phone={phone}
                            setPhone={setPhone}
                        />
                    </div>

                    <OrderSummary summary={summary} onSubmit={handleCheckout}/>
                </div>
            </div>
        </>

    );
};

export default OrderPage;

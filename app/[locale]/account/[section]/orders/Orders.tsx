import React from 'react';
import Image from 'next/image';
import styles from './Order.module.scss';
import Link from "next/link";
import {useI18n} from "@/locales/client";
import {useGetMyOrdersQuery} from "@/app/globalRedux/model/order/order.api";


export const statusTranslations: Record<string, string> = {
    created: "Создан",
    waiting_for_payment: "Ожидается оплата",
    paid: "Оплачен",
    waiting_seller_confirm: "Ожидает подтверждение продавца",
    processing_by_seller: "В работе у продавца",
    ready_for_delivery: "Готов к доставке",
    ready_for_pickup: "Готов к самовывозу",
    delivering: "Осуществляется доставка",
    delivered: "Доставлено",
    issued: "Выдан",
    cancelled_by_seller: "Отклонен Продавцом",
    cancelled_by_customer: "Отклонен Покупателем",
    payment_error: "Ошибка оплаты",
    refund: "К Возврату",
    partial_refund_processed: "Частичный возврат обработан",
    full_refund_processed: "Полный возврат обработан",
};

export const orderedStatusList = [
    "created",
    "waiting_for_payment",
    "paid",
    "waiting_seller_confirm",
    "processing_by_seller",
    "ready_for_delivery",
    "ready_for_pickup",
    "delivering",
    "delivered",
    "issued",
    "cancelled_by_seller",
    "cancelled_by_customer",
    "payment_error",
    "refund",
    "partial_refund_processed",
    "full_refund_processed",
];

import {useState} from "react";
import {OrderPagesId} from "@/src/components/OrderPagesId/ui/OrderPagesId";

export const Orders = () => {
    const t = useI18n();
    const {data} = useGetMyOrdersQuery();

    const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

    const orders = data?.data?.orders ?? [];

    if (selectedOrder) {
        return <OrderPagesId orderNumber={selectedOrder} onBack={() => setSelectedOrder(null)} />;
    }

    return (
        <div className={styles.ordersWrapper}>
            <h1 className={styles.title}>{t("orders.title")}</h1>

            <div className={styles.container}>
                <div className={styles.tableWrapper}>
                    <div className={styles.header}>
                        <span className={styles.colOrder}>{t("orders.orderNumber")}</span>
                        <span className={styles.colDate}>{t("orders.date")}</span>
                        <span className={styles.colStatus}>{t("orders.status")}</span>
                        <span className={styles.colPrice}>{t("orders.price")}</span>
                        <span className={styles.colQuantity}>{t("orders.quantity")}</span>
                        <span className={styles.colAction}></span>
                    </div>

                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className={styles.row}
                            onClick={() => setSelectedOrder(order.id)}
                            style={{cursor: "pointer"}}
                        >
              <span
                  className={`${styles.col} ${styles.colOrder}`}
                  data-label={t("orders.orderNumber")}
              >
                {order.id}
              </span>
                            <span
                                className={`${styles.col} ${styles.colDate}`}
                                data-label={t("orders.date")}
                            >
                {new Date(order.created_at).toLocaleDateString("ru-RU")}
              </span>
                            <span
                                className={`${styles.col} ${styles.colStatus} ${styles[`status_${order.status}`]}`}
                                data-label={t("orders.status")}
                            >
                {statusTranslations[order.status] || order.status}
              </span>
                            <span
                                className={`${styles.col} ${styles.colPrice}`}
                                data-label={t("orders.price")}
                            >
                {order.total_amount.toLocaleString("ru-RU")} с
              </span>
                            <span
                                className={`${styles.col} ${styles.colQuantity}`}
                                data-label={t("orders.quantity")}
                            >
                {order.order_items_count}
              </span>

                            <span
                                className={`${styles.col} ${styles.colAction} ${styles.icon}`}
                            >
                <Image
                    src="/icons/arrow-down.svg"
                    alt={t("orders.details")}
                    width={24}
                    height={24}
                />
              </span>

                            <button className={styles.button}>
                                <span className={styles.buttonText}>{t("orders.details")}</span>
                                <Image
                                    src="/icons/arrow-r.svg"
                                    alt={t("orders.details")}
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

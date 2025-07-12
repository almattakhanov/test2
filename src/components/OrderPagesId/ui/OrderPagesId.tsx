'use client';

import React, {useEffect, useState} from 'react';
import styles from './OrderPagesId.module.scss';
import Link from "next/link";
import Image from "next/image";
import {useCancelOrderMutation, useLazyGetOrderQuery} from "@/app/globalRedux/model/order/order.api";
import {useParams} from "next/navigation";
import {formatDate, formatPrice, pluralizeGoods} from "@/src/utils/helpers";
import {orderedStatusList, statusTranslations} from "@/app/[locale]/account/[section]/orders/Orders";
import {Collapse, Popover, Skeleton} from "antd";
import {OrderStatusTracker} from "@/src/components/OrderStatusTracker/OrderStatusTracker";
import {ArrowRightOutlined, CaretDownOutlined} from "@ant-design/icons";
import clsx from "clsx";
import ArrowDown from "@/public/icons/arrow-down-n.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import OrderItems from "@/src/components/OrderItems/OrderItems";

type Props = {
    orderNumber: number
    onBack: () => void;
}


import { Modal, Radio, Button, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {useNotify} from "@/app/hook/useNotify";
import {Order} from "@/app/globalRedux/model/order/order.type";

const { Text } = Typography;

const cancelReasons = [
    { value: 'changed_mind', label: 'Передумал / Изменились планы' },
    { value: 'found_cheaper', label: 'Нашёл дешевле / лучшее предложение' },
    { value: 'delivery_issues', label: 'Проблемы с доставкой' },
    { value: 'order_conditions', label: 'Не устроили условия заказа' },
    { value: 'agreed_with_seller', label: 'Связался с продавцом и договорился об отмене' },
    { value: 'technical_error', label: 'Техническая ошибка' },
];

export const OrderPagesId = ({orderNumber, onBack}: Props) => {
    // const params = useParams();
    // const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const { notify, contextHolder } = useNotify();
    const [isOpen, setIsOpen] = useState(false);
    const [cancelOrder, {isLoading: isCancelOrderLoading}] = useCancelOrderMutation();
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [cancelReason, setCancelReason] = useState<string | null>(null);

    const [getOrder, {data, isLoading}] = useLazyGetOrderQuery()

    const order = data?.data

    useEffect(() => {
        if (orderNumber) {
            getOrder(orderNumber.toString());
        }
    }, []);


    const currentStatus = order?.status;

    let nextStatusLabel: string | null = null;

    if (currentStatus) {
        const currentIndex = orderedStatusList.indexOf(currentStatus);
        if (currentIndex > -1 && currentIndex < orderedStatusList.length - 1) {
            const nextStatus = orderedStatusList[currentIndex + 1];
            nextStatusLabel = statusTranslations[nextStatus];
        }
    }

    const itemsCount = order?.order_items?.length || 0;
    const itemsLabel = pluralizeGoods(itemsCount);

    const total = (order?.total_amount ?? 0) - (order?.discount_amount ?? 0);

    const content = <OrderStatusTracker
      //  currentStatus={'В работе у продавца'}
         currentStatus={statusTranslations[order?.status!]}
    />;

    const openCancelModal = () => {
        setCancelModalVisible(true);
    };

    const handleCancelOrder = async () => {
        try {
            if (!cancelReason || !order?.id) return;

            await cancelOrder({
                orderNumber: order.id.toString(),
                reason: cancelReasons.find(r => r.value === cancelReason)?.label || '',
            }).unwrap();

            setCancelModalVisible(false);
            notify.success('Товары успешно отменен');
        } catch (error: any) {
            notify.error(error?.data?.error);
        }
    };

    return (
        <div className={styles.wrapper}>
            {contextHolder}
            {
                isLoading ? <Skeleton active paragraph={{rows: 10}}/> :
                    <>
                        <div className={styles.header}>
                            <button
                                onClick={onBack}
                                //  href="/account/orders"
                                className={styles.titleLink}
                                aria-label="Вернуться к заказам"
                            >
                                <div className={styles.titleContainer}>
                                    <Image
                                        src="/order/arrow_back.svg"
                                        width={24}
                                        height={24}
                                        alt="arrow_back"
                                        aria-hidden="true"
                                        className={styles.backIcon}
                                    />
                                    <h1 className={styles.pageTitle}>Заказ №{order?.id}</h1>
                                </div>
                            </button>
                            <button className={styles.cancelBtn} onClick={openCancelModal}>
                                Отменить заказ
                            </button>
                        </div>

                        <div className={styles.popoverWrap}>
                            <Popover
                                content={content}
                                trigger="click"
                                placement="bottom"
                                onOpenChange={setIsOpen} // вызывается с true/false
                                //  overlayClassName={styles.orderStatusPopover} // для кастомных стилей если нужно
                            >
                                <p className={styles.status}>
                                    {statusTranslations[order?.status!]}

                                    {nextStatusLabel && (
                                        <>
                                            <ArrowRight/>
                                            <span className={styles.nextStatus}>
                                                   {nextStatusLabel}
                                             </span>
                                        </>
                                    )}

                                    <ArrowDown
                                        className={clsx({[styles.rotate]: isOpen})}
                                    />
                                </p>
                            </Popover>
                        </div>
                        <OrderItems
                            order={data?.data!}
                        />


                        <div className={styles.orderInfo}>
                            <div className={styles.infoBox}>
                                <p className={styles.infoTitle}>
                                    Информация по заказу
                                </p>
                                <div className={styles.infoContainer}>
                                    <div className={styles.info}>
                                        <p className={styles.infoSubTitle}>Количество товаров</p>
                                        <p className={styles.infoValue}>{itemsLabel}</p>
                                    </div>
                                    <div className={styles.info}>
                                        <p className={styles.infoSubTitle}>Стоимость</p>
                                        <p className={styles.infoPrice}>{formatPrice(order?.total_amount!)} с</p>
                                    </div>
                                    <div className={styles.info}>
                                        <p className={styles.infoSubTitle}>Скидка</p>
                                        <p className={styles.infoDiscount}>{formatPrice(order?.discount_amount!)} с</p>
                                    </div>
                                    <div className={styles.info}>
                                        <p className={styles.infoTotal}>Итого</p>
                                        <p className={styles.infoTotal}>{formatPrice(total)} с</p>
                                    </div>
                                    {/*<div className={styles.info}>*/}
                                    {/*    <p className={styles.infoSubTitle}>Рассрочка на 12 месяцев</p>*/}
                                    {/*    <p className={styles.infoInstallment}>97 928 с</p>*/}
                                    {/*</div>*/}
                                </div>
                            </div>

                            <div className={styles.line}></div>

                            <div className={styles.infoBox}>
                                <p className={styles.infoTitle}>
                                    Детали доставки
                                </p>
                                <div className={styles.infoContainer}>
                                    <div className={styles.info}>
                                        <p className={styles.infoSubTitle}>Дата</p>
                                        <p className={styles.infoPrice}>{formatDate(order?.created_at)}</p>
                                    </div>
                                    <div className={styles.info}>
                                        <p className={styles.infoSubTitle}>Адрес доставки</p>
                                        <p className={styles.infoAddress}>{order?.address}</p>
                                    </div>
                                    <div className={styles.info}>
                                        <p className={styles.infoSubTitle}>Имя</p>
                                        <p className={styles.infoPrice}>{order?.user_name}</p>
                                    </div>
                                    <div className={styles.info}>
                                        <p className={styles.infoSubTitle}>Телефон</p>
                                        <p className={styles.infoPrice}>{order?.user_phone}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </>
            }

            <Modal
                open={cancelModalVisible}
                onCancel={() => setCancelModalVisible(false)}
                footer={null}
                closable={true}
                centered
            >
                <Typography.Title level={2}>Отменить заказ</Typography.Title>

                {/*<Text type="danger" style={{ display: 'block', marginBottom: 16 }}>*/}
                {/*    Внимание! Отмена заказа по неуважительной причине негативно*/}
                {/*    отражается на рейтинге вашего магазина*/}
                {/*</Text>*/}

                <Radio.Group
                    onChange={(e) => setCancelReason(e.target.value)}
                    value={cancelReason}
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                    {cancelReasons.map((reason) => (
                        <Radio key={reason.value} value={reason.value}>
                            {reason.label}
                        </Radio>
                    ))}
                </Radio.Group>

                <Button
                    type="primary"
                    block
                    loading={isCancelOrderLoading}
                    style={{ marginTop: 24 }}
                    onClick={handleCancelOrder}
                    disabled={!cancelReason || isCancelOrderLoading}
                >
                    Подтвердить отмену
                </Button>
            </Modal>

        </div>
    );
};


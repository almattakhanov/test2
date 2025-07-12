'use client';

import React from 'react';
import styles from './Payment.module.scss';
import {Flex, Radio} from 'antd';
import {getMonthLabel} from "@/src/utils/helpers";

interface PaymentProps {
    paymentOptionsData: {
        card: { is_active: boolean };
        installment: { is_active: boolean; terms: Record<string, number> };
        credit?: { is_active: boolean; terms: Record<string, number> };
        phone?: { is_active: boolean };
    };
    paymentType: string;
    onPaymentTypeChange: (value: string) => void;
    installmentTerm: string;
    onInstallmentTermChange: (value: string) => void;
}

export const Payment: React.FC<PaymentProps> = (
    {
        paymentOptionsData,
        paymentType,
        onPaymentTypeChange,
        installmentTerm,
        onInstallmentTermChange,
    }) => {
    const {card, installment, credit, phone} = paymentOptionsData;

    const paymentOptions = React.useMemo(() => {
        const opts = [];
        if (card?.is_active) opts.push({label: 'Картой онлайн', value: 'Card'});
        if (installment?.is_active) opts.push({label: 'Рассрочка', value: 'Installment'});
        if (credit?.is_active) opts.push({label: 'Кредит', value: 'Credit'});
        if (phone?.is_active) opts.push({label: 'Оплата по телефону', value: 'Phone'});
        return opts;
    }, [card, installment, credit, phone]);

    const installmentOptions = React.useMemo(() => {
        let terms: Record<string, any> | undefined;

        if (paymentType === 'Installment') {
            terms = installment?.terms;
        } else if (paymentType === 'Credit') {
            terms = credit?.terms;
        }

        if (!terms) return [];

        return Object.keys(terms).map((key) => {
            const monthNumber = +key;
            const label = `${monthNumber} ${getMonthLabel(monthNumber)}`;
            return {
                label,
                value: `${key}Months`,
            };
        });
    }, [installment, credit, paymentType]);

    if (paymentOptions.length === 0) {
        return <div>Нет доступных способов оплаты</div>;
    }

    return (
        <Flex vertical className={styles.payment}>
            <h2 className={styles.title}>Способ оплаты</h2>
            <Flex className={styles.radioGroupContainer}>
                <Radio.Group
                    className={styles.radioGroup}
                    options={paymentOptions}
                    value={paymentType}
                    onChange={(e) => onPaymentTypeChange(e.target.value)}
                    optionType="button"
                />
            </Flex>

            {(paymentType === 'Installment' || paymentType === 'Credit') && installmentOptions.length > 0 && (
                <>
                    <h2 className={styles.title}>Срок {paymentType === 'Installment' ? 'рассрочки' : 'кредита'}</h2>
                    <Flex className={styles.radioGroupContainer}>
                        <Radio.Group
                            className={styles.radioGroup}
                            options={installmentOptions}
                            value={installmentTerm}
                            onChange={(e) => onInstallmentTermChange(e.target.value)}
                            optionType="button"
                        />
                    </Flex>
                </>
            )}
        </Flex>
    );
};

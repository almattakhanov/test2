import React from 'react';
import styles from './OrderSummary.module.scss';
import Link from "next/link";

export interface OrderSummaryProps {
    summary: {
        total: string;
        discount: string;
        delivery: string;
        final: string;
        monthly: string;
        count: number;
        paymentType?: string;
        installmentTerm?: string; // например '6 месяцев'
    };
    onSubmit: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ summary, onSubmit }) => (
    <div className={styles.summaryBox}>
        <h3>Ваш заказ</h3>
        <div className={styles.summaryLines}>
            <div className={styles.summaryLine}>
                <span>Товары ({summary.count})</span>
                <span className={styles.total}>{summary.total} с</span>
            </div>
            <div className={styles.summaryLine}>
                <span>Скидка</span>
                <span className={styles.discount}>{summary.discount} с</span>
            </div>
            <div className={styles.summaryLine}>
                <span>Доставка</span>
                <span className={styles.delivery}>{summary.delivery}</span>
            </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.summaryLineTotal}>
            <span>Итого</span>
            <span>{summary.final} с</span>
        </div>
        {(summary.paymentType === 'Installment' || summary.paymentType === 'Credit') && summary.installmentTerm && (
            <div className={styles.monthly}>
                <p>
                    {summary.paymentType === 'Installment' && <>{summary.installmentTerm}</>}
                    {summary.paymentType === 'Credit' && <>{summary.installmentTerm}</>}
                </p>
                <span>{summary.monthly} с</span>
            </div>
        )}
        <button className={styles.checkout} onClick={onSubmit}>
            Оформить
        </button>
        <div className={styles.deliveryInfo}>
            Нажимая на кнопку, вы соглашаетесь с{" "}
            <span className={styles.blue}>Условиями обработки</span> персональных
            данных, а также с{" "}
            <span className={styles.blue}>Условиями продажи</span> <br />
        </div>
    </div>
);



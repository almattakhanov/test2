import React from "react";
import styles from "./CartSummary.module.scss";
import clsx from "clsx";

interface CartSummaryProps {
    summary: {
        total: string;
        discount: string;
        final: string;
        monthly: string;
    };
    handleCheckout: () => void;
    disabledBtn: boolean
}

export const CartSummary: React.FC<CartSummaryProps> = ({summary, handleCheckout, disabledBtn}) => {

    return (
        <div className={styles.summaryBox}>
            <h3>Ваша корзина</h3>
            <div className={styles.summaryLines}>
                <div className={styles.summaryLine}>
                    <span>Товары</span>
                    <span className={styles.total}>{summary?.total} с</span>
                </div>
                <div className={styles.summaryLine}>
                    <span>Скидка</span>
                    <span className={styles.discount}>{summary?.discount} с</span>
                </div>
                <div className={styles.summaryLine}>
                    <span>Скидка по промокоду</span>
                    <span className={styles.discount}>{summary?.discount} с</span>
                </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.summaryLineTotal}>
                <span>Итого</span>
                <span>{summary?.final} с</span>
            </div>
            <div className={styles.monthly}>
                <p>Рассрочка на 12 месяцев</p>
                <span>{summary?.monthly} с</span>
            </div>
            <button
                disabled={disabledBtn}
                onClick={handleCheckout}
                className={clsx(styles.checkout, {[styles.disabled]: disabledBtn})}>
                Перейти к оформлению
            </button>
            <div className={styles.deliveryInfo}>
                Способы и время доставки <br/> можно выбрать при оформлении
            </div>
        </div>
    );
};

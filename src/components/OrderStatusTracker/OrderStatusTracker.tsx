import styles from './OrderStatusTracker.module.scss';
import classNames from 'classnames';

type Props = {
    currentStatus: string;
};

const ORDER_STATUSES = [
    'Создан',
    "Ожидается оплата",
    'Оплачен',
    'Ожидает подтверждение продавца',
    'В работе у продавца',
    'Готов к доставке',
    'Доставляется',
    'Доставлен',
];

export const OrderStatusTracker = ({ currentStatus }: Props) => {
    const currentIndex = ORDER_STATUSES.findIndex(
        (status) => status === currentStatus
    );

    const activeIndex = currentIndex + 1;

    return (
        <div className={styles.tracker}>
            {ORDER_STATUSES.map((status, index) => {
                const isCompleted = index <= currentIndex;
                const isActive = index === activeIndex;
                const isFuture = index > activeIndex;

                return (
                    <div
                        key={status}
                        className={classNames(styles.step, {
                            [styles.completed]: isCompleted,
                            [styles.active]: isActive,
                            [styles.future]: isFuture,
                        })}
                    >
                        <div className={styles.iconWrapper}>
                            <div className={styles.circle} />
                            {index < ORDER_STATUSES.length - 1 && (
                                <div className={styles.line} />
                            )}
                        </div>
                        <span className={styles.label}>{status}</span>
                    </div>
                );
            })}
        </div>
    );
};

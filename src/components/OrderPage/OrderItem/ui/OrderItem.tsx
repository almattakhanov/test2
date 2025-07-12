import React from 'react';
import styles from './OrderItem.module.scss';
import Image from 'next/image';
import {Checkbox} from "antd";

interface OrderItemProps {
    item: {
        id: number;
        image: string;
        name: string;
        color: string;
        memory: string;
        price: string;
        quantity: number;
        isFavorite: boolean;
    };
}

export const OrderItem: React.FC<OrderItemProps> = ({item}) => (
    <div className={styles.orderItem}>
        <div className={styles.left}>
            <div className={styles.checkbox}>
                <Checkbox onChange={() => {}}>
                </Checkbox>
            </div>

            <Image
                src={item.image}
                alt="Product"
                width={92}
                height={112}
                className={styles.image}
            />
            <div className={styles.itemInfo}>
                <div className={styles.namePrice}>
                    <p className={styles.name}>{item.name}</p>
                    <div className={styles.price}>{item.price}</div>
                </div>
                <div className={styles.desc}>Цвет: {item.color}</div>
                <div className={styles.desc}>Память: {item.memory}</div>
            </div>
        </div>
        <div className={styles.icons}>
            <div className={styles.leftIcons}>
                <button>
                    <Image
                        src='/tabBar/heart.svg'
                        alt="favorite"
                        width={24}
                        height={24}
                    />
                </button>
                <button>
                    <Image
                        src='/icons/delete.svg'
                        alt="delete"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <div className={styles.bottom}>
                <div className={styles.actions}>
                    <button>
                        <Image
                            src='/icons/remove.svg'
                            alt="delete"
                            width={24}
                            height={24}
                        />

                    </button>
                    <span>{item.quantity}</span>
                    <button>
                        <Image
                            src='/icons/add.svg'
                            alt="delete"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

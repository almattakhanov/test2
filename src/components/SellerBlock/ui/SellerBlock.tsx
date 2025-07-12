import React from 'react';
import styles from "./SellerBlock.module.scss";
import Image from "next/image";
import Link from "next/link";
import {Rate} from "antd";

const SellerBlock = () => {
    return (
        <div className={styles.wrapper}>
            <Link href="/" className={styles.title}>
                <Image
                    src="/icons/arrow_l.svg"
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                />
                <h2>ИП Алимбай</h2>
            </Link>

            <div className={styles.content}>
                <div className={styles.imageBlock}>
                    <Image
                        src="/seller/category.jpg"
                        alt=""
                        width={250}
                        height={107}
                        unoptimized
                    />
                </div>

                <div className={styles.info}>
                    <div className={styles.rateBlock}>
                        <Rate style={{fontSize: '16px'}} allowHalf defaultValue={2.5}/>
                        <span className={styles.rate}>4,0</span>
                    </div>
                    <div className={styles.textBlock}>
                        <p>Добро пожаловать в наш магазин! Мы — команда профессионалов, специализирующаяся на продаже
                            смартфонов и аксессуаров. Наша цель — предоставить вам широкий выбор современных устройств
                            по конкурентоспособным ценам. </p>
                        <p>Мы предлагаем только оригинальные смартфоны от проверенных производителей. Каждое устройство
                            проходит тщательную проверку перед продажей.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SellerBlock;

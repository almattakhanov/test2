import styles from './Subscription.module.scss';
import {Button, Flex, Input} from "antd";
import React from "react";
import {useI18n} from "@/locales/client";

export const Subscription = () => {
    const t = useI18n();

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{t('subscription.manage')}</h1>
            <p className={styles.text}>{t('subscription.subscribe')}</p>

            <Flex vertical className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <Input className={styles.input} placeholder=""/>
            </Flex>

            <Button className={styles.sortToggle}>{t('subscription.subscribeButton')}</Button>
        </div>
    );
};

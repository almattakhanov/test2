'use client';

import styles from "./LocaleSelect.module.scss";
import {useChangeLocale, useCurrentLocale} from "@/locales/client";
import {Select, Skeleton} from "antd";
import Image from "next/image";
import {languageOptions} from "@/src/components/LocaleSelect";
import ArrowDown from '@/public/icons/arrow-down-n.svg';
import clsx from "clsx";
import {useEffect, useMemo, useState} from "react";

type Props = {
    variant?: 'fullWidth',
};

export const LocaleSelect = ({ variant }: Props) => {
    const locale = useCurrentLocale();
    const changeLocale = useChangeLocale();

    const [showSkeleton, setShowSkeleton] = useState(true);

    const selected = useMemo(
        () => languageOptions.find(({ value }) => value === locale),
        [locale]
    );

    useEffect(() => {
        if (locale) {
            const timer = setTimeout(() => {
                setShowSkeleton(false);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [locale]);

    const handleChange = (value: string) => {
        changeLocale(value as any);
    };

    if (showSkeleton || !selected) {
        return (
            <div className={styles.localeSelect}>
                <Skeleton.Button
                    active
                    size="small"
                    style={{
                        width: 50,
                        height: 24,
                        verticalAlign: 'middle',
                    }}
                />
            </div>
        );
    }

    return (
        <div className={styles.localeSelect}>
            <Select
                value={locale}
                onChange={handleChange}
                size="small"
                suffixIcon={
                    <ArrowDown className={clsx({ [styles.rotate]: variant === 'fullWidth' })} />
                }
                className={styles.select}
                popupMatchSelectWidth={false}
                variant="borderless"
                // 👇 Используем customLabel для отображения ТОЛЬКО флага
                optionLabelProp="customLabel"
                options={languageOptions.map(({ value, label, fullName, flag, labelSettings }) => ({
                    value,
                    label: (
                        <div className={styles.option}>
                            <Image src={flag} alt={label} width={16} height={12} />
                            <span>{fullName}</span>
                        </div>
                    ),
                    customLabel: (
                        <Image src={flag} alt={label} width={24} height={22} />
                    ),
                }))}
            />
        </div>
    );
};
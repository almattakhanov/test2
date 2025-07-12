import React from 'react'
import Image from 'next/image'
import styles from '../Address.module.scss'
import {useI18n} from "@/locales/client";

type AddAddressButtonProps = {
    onClick: () => void
}

export const AddAddressButton = ({ onClick}: AddAddressButtonProps) => {
    const t = useI18n()


    return (
        <button className={styles.button} onClick={onClick} type="button">
            <Image src="/icons/add.svg" alt={t('address.addAddress')} width={24} height={24} unoptimized/>
            <p>{t('address.addAddress')}</p>
        </button>
    )

}

'use client'

import React from 'react';
import { Descriptions } from 'antd';
import styles from './TabSpecifications.module.scss';
import {useGetProductMutation} from "@/app/globalRedux/model/product/product.api";
import {AttributesType} from "@/app/globalRedux/model/product/product.type";

type Props= {
    attributes: AttributesType[];
}

export const TabSpecifications = ({attributes}: Props) => {

    const items = attributes?.map(attr => ({
        key: attr.id.toString(),
        label: attr.name,
        children:
            attr.value_type === "BOOLEAN"
                ? attr.value === "true" ? "Есть" : "Нет"
                : attr.value,
    }));

    return (
        <div className={styles.wrapper}>
            {attributes?.length > 0 ? attributes?.map(attr => (
                    <React.Fragment key={attr.id}>
                        <div className={styles.label}>
                            {attr.name}
                        </div>
                        <div className={styles.value}>
                            {attr.value_type === "BOOLEAN"
                                ? (attr.value === "true" ? "Есть" : "Нет")
                                : attr.value}
                        </div>
                    </React.Fragment>
                ))
                : <p>Нет характеристик</p>
            }
        </div>
        // <div className={styles.wrapper}>
        //     {
        //         items?.length > 0 ?  <Descriptions
        //             items={items}
        //             colon
        //             column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 4 }}
        //         /> : <p>Нет характеристик</p>
        //     }
        // </div>
    );
};

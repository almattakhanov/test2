'use client'

import { Segmented } from 'antd'
import {useEffect, useState} from 'react'
import { ThreeMonthPlanTab } from "@/src/components/StoreInformation/tab/ThreeMonthPlanTab/ui/ThreeMonthPlanTab"
import styles from "./StoreInformation.module.scss"
import {Offer, ProductData} from "@/app/globalRedux/model/product/product.type";

type Props = {
    module?: boolean;
    offers: Offer[];
    setIsModalOpenAction?: (isOpen: boolean) => void;
    product: ProductData
};


export const StoreInformation = ({ module, offers, setIsModalOpenAction, product }: Props) => {
    const [selectedSelTab, setSelectedSelTab] = useState<string>('Картой');
    const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined);

    const getTermOptions = (): string[] => {
        if (!offers?.length) return [];

        const key = selectedSelTab === 'Рассрочка' ? 'installment' : 'credit';
        const terms = offers
            .filter(o => o.payment_info?.[key]?.is_active)
            .flatMap(o => Object.keys(o.payment_info?.[key]?.terms || {}));

        const uniqueTerms = Array.from(new Set(terms)).sort((a, b) => Number(a) - Number(b));
        return uniqueTerms;
    };


    // Установка начального значения selectedTab при первой загрузке offers или смене способа оплаты
    useEffect(() => {
        if (selectedSelTab === 'Картой') {
            setSelectedTab(undefined);
            return;
        }

        const options = getTermOptions();
        if (options.length) {
            setSelectedTab(options[0]); // установить первый доступный срок
        }
    }, [selectedSelTab, offers]);

    const renderContent = () => {
        const months = parseInt(selectedTab || '0');
        return (
            <ThreeMonthPlanTab
                module={module}
                offers={offers}
                selectedPayment={selectedSelTab}
                selectedMonths={months}
                setIsModalOpenAction={setIsModalOpenAction!}
                product={product}
            />
        );
    };

    return (
        <div className={`${styles.wrapper} ${module ? styles.moduleWrapper : ''}`}>
            <div className={styles.selContainer}>
                <Segmented
                    options={['Картой', 'Рассрочка', 'Кредит']}
                    block
                    value={selectedSelTab}
                    onChange={v => setSelectedSelTab(v as string)}
                />
            </div>

            {selectedSelTab !== 'Картой' && (
                <div className={styles.selectContainer}>
                    <Segmented
                        options={getTermOptions()}
                        block
                        value={selectedTab}
                        onChange={v => setSelectedTab(v as string)}
                    />
                </div>
            )}

            <div style={{ marginTop: 16 }}>
                {renderContent()}
            </div>
        </div>
    );
};

'use client';

import { Segmented } from 'antd';
import { useState } from 'react';
import { TabSpecifications } from './tabs/TabSpecifications/ui/TabSpecifications';
import { TabDescription } from './tabs/TabDescription/ui/TabDescription';
import { TabReviews } from './tabs/TabReviews/ui/TabReviews';
import {AttributesType} from "@/app/globalRedux/model/product/product.type";

type Props= {
    attributes: AttributesType[];
}

export const ProductTabs = ({attributes}: Props) => {
    const [selectedTab, setSelectedTab] = useState<string>('Характеристики');

    const renderContent = () => {
        switch (selectedTab) {
            case 'Характеристики':
                return <TabSpecifications attributes={attributes}/>;
            case 'Описание':
                return <TabDescription />;
            case 'Отзывы':
                return <TabReviews />;
            default:
                return null;
        }
    };

    return (
        <>
            <Segmented
                options={['Характеристики', 'Описание', 'Отзывы']}
                block
                onChange={setSelectedTab}
                value={selectedTab}
            />

            <div style={{ marginTop: 16 }}>
                {renderContent()}
            </div>
        </>
    );
};

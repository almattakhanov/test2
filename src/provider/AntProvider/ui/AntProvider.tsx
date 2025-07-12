'use client';

import React, {FC, ReactNode} from 'react';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/locale/ru_RU';
import {THEME_CONFIG} from '../config';
import '@ant-design/v5-patch-for-react-19';


export const AntProvider: FC<{ children: ReactNode }> = ({children}) => {
    return <ConfigProvider
       theme={THEME_CONFIG}
        locale={ruRU}>
        {children}
    </ConfigProvider>;
};

'use client';

import React, {ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "@/app/globalRedux/store";
import {I18nProviderClient} from "@/locales/client";
import Loader from "@/src/components/Loader/ui/Loader";

type ProvidersProps = {
    children: ReactNode;
    locale: string;
};

export const Providers = ({children, locale}: ProvidersProps) => {
    return (
        <Provider store={store}>
            <I18nProviderClient
                locale={locale}
                fallback={
                    <Loader/>
                }
            >
                {children}
            </I18nProviderClient>
        </Provider>
    );
};

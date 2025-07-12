import type {Metadata} from "next";
import {Roboto} from "next/font/google";

import "../../assets/styles/globals.css";
import "../../assets/styles/variables.css";
import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";
import {APP_DESCRIPTION, APP_NAME, APP_URL} from "@/src/lib/constants";
import {AntProvider} from "@/src/provider/AntProvider";
import {Providers} from "@/app/globalRedux/providers";
import {ReactNode, Suspense} from "react";
import {theme} from "antd";
import Script from "next/script";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: {
        template: `%s | ${APP_NAME}`,
        default: APP_NAME,
    },

    description: APP_DESCRIPTION,
    metadataBase: new URL(APP_URL!),
    icons: {
        icon: "/favicon.svg",
    },
};

export default async function RootLayout(
    {
        children,
        params,
    }: {
        children: ReactNode;
        params: Promise<{ locale: string }>;
    }) {
    const {locale} = await params;

    return (
        <html lang={locale}>
        <head>
            <Script
                src="https://cdn.amplitude.com/script/f7a6a75ff69374b1f137cd2a3c3daee6.js"
                strategy="beforeInteractive"
            />
            <Script id="amplitude-init" strategy="beforeInteractive">
                {`
            window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
            window.amplitude.init('f7a6a75ff69374b1f137cd2a3c3daee6', {
              fetchRemoteConfig: true,
              autocapture: true
            });
          `}
            </Script>
        </head>

        <body className={roboto.variable} style={{height: '100%'}}>
        <Theme style={{display: 'flex', flexDirection: 'column'}}>
            <Providers locale={locale}>
                <AntProvider>{children}</AntProvider>
            </Providers>
        </Theme>
        </body>
        </html>
    );
}

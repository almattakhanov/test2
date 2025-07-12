import styles from './Layout.module.scss';
import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import TabBar from "@/src/components/TabBar/page";
import React from "react";


export default function PublicLayout(
    {
        children,
    }: {
        children: React.ReactNode;
    }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Header/>
                <main className='main'>
                    {children}
                    <TabBar/>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

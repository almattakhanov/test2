import React from 'react';
import styles from "@/app/[locale]/Page.module.scss";
import {Header} from "@/src/components/Header/page";
import {ProductBlock} from "@/src/components/ProductBlock/ProductBlock";
import {Footer} from "@/src/components/Footer/ui/Footer";
import SellerBlock from "@/src/components/SellerBlock/ui/SellerBlock";
import TabBar from "@/src/components/TabBar/page";

const Page = () => {
    return (
        <div className={styles.wrapper}>
            <div className='container'>
                <Header/>
                <main className='main'>
                    <SellerBlock/>
                    <div className={styles.line}></div>
                    <ProductBlock title={'Товары ИП Алимбай'} productLength={'135'}/>
                    <ProductBlock/>
                    <TabBar/>
                </main>
            </div>
            <Footer/>
        </div>
    );
};

export default Page;

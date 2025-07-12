'use client';
import React from 'react';
import {Header} from "@/src/components/Header/page";

import styles from "@/app/[locale]/Page.module.scss";
import {Footer} from "@/src/components/Footer/ui/Footer";
import CartPage from "@/src/components/CartPage/ui/CartPage";
import {ProductBlock} from "@/src/components/ProductBlock/ProductBlock";
import Stocks from "@/src/components/CartPage/Stocks/ui/Stocks";
import TabBar from "@/src/components/TabBar/page";

const Page = () => {


    return (
        <>
            <div className='container'>
                <Header/>
                <main className='main'>
                    <div className={styles.blockWrapper}>
                        <CartPage/>
                        {/*<div className={styles.lineCart}></div>*/}
                        {/*<ProductBlock title={'С этим покупают'}/>*/}
                        {/*<Stocks/>*/}
                        <TabBar/>
                    </div>
                </main>
            </div>
            <Footer/>
        </>
    );
};


export default Page;

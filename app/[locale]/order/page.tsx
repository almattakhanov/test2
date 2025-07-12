import React from 'react';
import {Header} from "@/src/components/Header/page";

import styles from "@/app/[locale]/Page.module.scss";
import {Footer} from "@/src/components/Footer/ui/Footer";
import OrderPage from "@/src/components/OrderPage/ui/OrderPage";
import TabBar from "@/src/components/TabBar/page";
import style from './style.module.scss'

const Page = () => {
    return (
        <>
            <div className={style.wrapper}>
                {/*<div className='container'>*/}
                <Header/>
                <main className={style.main}>
                    <div className={'container'}>
                        <OrderPage/>
                        <TabBar/>
                    </div>
                </main>
                {/*</div>*/}
                <Footer/>
            </div>

        </>
    );
};


export default Page;

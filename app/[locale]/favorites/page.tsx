import React from 'react';
import {Header} from "@/src/components/Header/page";

import styles from "@/app/[locale]/Page.module.scss";
import {Footer} from "@/src/components/Footer/ui/Footer";
import {Favorites} from "@/src/components/Favorites/ui/Favorites";
import TabBar from "@/src/components/TabBar/page";

const Page = () => {
    return (
        <>
        {/*<div className='wrapper'>*/}
            <div className='container'>
                <Header/>
                <main className='main'>
                    <Favorites/>
                    <TabBar />
                </main>
            </div>
            <Footer/>
        {/*</div>*/}
        </>
    );
};


export default Page;

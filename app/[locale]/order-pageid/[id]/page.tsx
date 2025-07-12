import React from 'react';
import {Header} from "@/src/components/Header/page";


import {Footer} from "@/src/components/Footer/ui/Footer";
import {OrderPagesId} from "@/src/components/OrderPagesId/ui/OrderPagesId";


const Page = () => {
    return (
        <>
            <div className='container'>
                <Header/>
                <main className='main'>
                    {/*<OrderPagesId orderNumber={orderNumber}/>*/}
                </main>
            </div>
            <Footer/>
        </>
    );
};


export default Page;

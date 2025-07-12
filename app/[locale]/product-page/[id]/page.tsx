"use client"

import React, {useEffect, useState} from 'react';
import {Header} from "@/src/components/Header/page";

import styles from "@/app/[locale]/Page.module.scss";
import PageSlider from "@/src/components/PageSlider/PageSlider";
import ProductParameters from "@/src/components/ProductParameters/ui/ProductParameters";
import {Footer} from "@/src/components/Footer/ui/Footer";
import {ProductTabs} from "@/src/components/ProductTabs/ProductTabs";
import {Breadcrumb, Descriptions, DescriptionsProps} from 'antd';
import {StoreInformation} from "@/src/components/StoreInformation/ui/StoreInformation";
import {ProductBlock} from "@/src/components/ProductBlock/ProductBlock";
import TabBar from "@/src/components/TabBar/page";
import {useParams} from "next/navigation";
import {useGetCategoryProductsMutation,} from "@/app/globalRedux/model/caterogy/category.api";
import {useGetOffersMutation, useGetProductMutation} from "@/app/globalRedux/model/product/product.api";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import '../styles.scss';

import {FreeMode, Navigation, Thumbs} from 'swiper/modules';



const Page = () => {
    const params = useParams();
    const id = params?.id!;

    const [getProduct, {data: product},] = useGetProductMutation();
    const [getOffer, {data: offer},] = useGetOffersMutation();


    useEffect(() => {
        if (id) {
            getProduct(+id)
            getOffer(+id)
        }
    }, [id, getProduct]);


    return (
        <div className={styles.wrapper}>

            <div className='container'>
                <Header/>
                <main className='main'>
                    <div className={styles.pageWrapper}>
                        <div className={styles.breadcrumb}>
                            <Breadcrumb
                                items={[
                                    {title: <a href="/">Главная</a>,},
                                    {title: product?.data.name},
                                ]}
                            />

                            {/*<Breadcrumb*/}
                            {/*    routes={breadcrumbRoutes}*/}
                            {/*/>*/}
                        </div>

                        <div className={styles.pageContainer}>
                            <div className={styles.pageBlocks}>
                                <div className={styles.productContent}>
                                    <PageSlider images={product?.data?.image_urls}/>
                                    <ProductParameters
                                        offers={offer?.data!}
                                        product={product?.data!}/>
                                </div>
                            </div>
                            <StoreInformation
                                product={product?.data!}
                                offers={offer?.data || []}/>
                        </div>
                        {/*<ProductBlock title={'Сезонные скидки'}/>*/}
                        {/*<ProductBlock title={'Сейчас покупают'}/>*/}
                        <TabBar/>
                    </div>
                    <ProductTabs attributes={product?.data?.attributes!}/>
                </main>
            </div>
            <Footer/>
        </div>
    );
};


export default Page;

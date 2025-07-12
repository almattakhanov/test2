'use client'

import styles from './Page.module.scss';
import {Header} from "@/src/components/Header/page";
import TabBar from "@/src/components/TabBar/page";
import CategoryNav from "@/src/components/CategoryNav/CategoryNav";
import Presentation from "@/src/components/Presintation/Presentation";
import {ProductBlock} from "@/src/components/ProductBlock/ProductBlock";
import SharesBlock from "@/src/components/SharesBlock/SharesBlock";
import SingleBanner from "@/src/components/SingleBanner/SingleBanner";
import {Footer} from "@/src/components/Footer/ui/Footer";
import {
    useGetGamesQuery,
    useGetNewProductsAndAccessoriesQuery,
    useGetReliableHouseholdAppliancesQuery,
    useGetSmartphonesAtGreatPriceQuery
} from "@/app/globalRedux/model/product/product.api";
import GoogleMapCart from "@/src/components/GoogleMapCart/GoogleMapCart";
import React from "react";

export default function Home() {
    // Смартфоны по выгодной цене
    const {data: smartphonesAtGreatPrice} = useGetSmartphonesAtGreatPriceQuery()
    // Умная техника для вашего комфорта
    const {data: reliableHouseholdAppliances} = useGetReliableHouseholdAppliancesQuery()
    // Новинки и аксессуары
    const {data: productsAndAccessories} = useGetNewProductsAndAccessoriesQuery()

    const {data: gamesdata} = useGetGamesQuery()


    return (
        <>
            <Header/>
            <main className='main'>
                <div className={styles.blockWrapper}>
                    <CategoryNav/>
                    {/*<GoogleMapCart/>*/}
                    {/*<Presentation/>*/}
                    {
                        !!smartphonesAtGreatPrice?.data.products.length &&  <ProductBlock
                            title={'Смартфоны по выгодной цене'}
                            productsData={smartphonesAtGreatPrice?.data?.products}
                        />
                    }

                    {
                        !!reliableHouseholdAppliances?.data.products.length && <ProductBlock
                            title={'Умная техника для вашего комфорта'}
                            productsData={reliableHouseholdAppliances?.data.products}
                        />
                    }
                    {
                        !!gamesdata?.data.products.length && <ProductBlock
                            title={'Играй с удовольствием'}
                            productsData={gamesdata?.data.products}
                        />
                    }

                    {/*<SingleBanner/>*/}
                    {/*<SharesBlock/>*/}
                    {
                        !!productsAndAccessories?.data.products.length && <ProductBlock
                            title={'Новинки и аксессуары'}
                            productsData={productsAndAccessories?.data.products}
                        />
                    }
                    {/*<ProductBlock title={'Вам понравится'}/>*/}
                    <TabBar/>
                </div>
            </main>
            <Footer/>
        </>
    );
}


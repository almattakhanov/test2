'use client'

import {useParams} from 'next/navigation'
import {Profile} from "@/app/[locale]/account/[section]/profile/Profile"
import {Orders} from "@/app/[locale]/account/[section]/orders/Orders"
import {Security} from "@/app/[locale]/account/[section]/security/Security"
import AccountLayout from "@/app/[locale]/account/[section]/accountLayout/AccountLayout"
import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import {Address} from "@/app/[locale]/account/[section]/address/Address";
import {Subscription} from "@/app/[locale]/account/[section]/subscription/Subscription";
import TabBar from "@/src/components/TabBar/page";
import React from "react";


export default function AccountSectionPage() {
    const {section} = useParams()

    const renderContent = () => {
        switch (section) {
            case 'profile':
                return <Profile/>
            case 'orders':
                return <Orders/>
            case 'addresses':
                return <Address/>
            case 'security':
                return <Security/>
            case 'subscription':
                return <Subscription/>
            default:
                return <h1>Раздел не найден</h1>
        }
    }

    return (
        <>
            {/*<div className='container'>*/}
                <Header/>
                <main className='main'>
                    <AccountLayout>
                        {renderContent()}
                        <TabBar/>
                    </AccountLayout>
                </main>
            {/*</div>*/}
            <Footer/>
        </>
    )
}

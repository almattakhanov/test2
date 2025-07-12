'use client'

import * as React from "react";
import Link from "next/link";
import {Accordion} from "radix-ui";
import classNames from "classnames";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import styles from "./Catalog.module.scss";
import {accordionData} from "./index";
import {useGetCategoryFirstLevelQuery} from "@/app/globalRedux/model/caterogy/category.api";
import {Category} from "@/app/globalRedux/model/caterogy/category.type";
import Image from "next/image";

export default function Catalog() {
    const {data, isLoading} = useGetCategoryFirstLevelQuery()
    const categories = data?.data

    return (
        <>
            <div className={styles.desktopContainer}>
                {accordionData.map(({title, items}) => (
                    <div key={title} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{title}</h2>
                        <div className={styles.grid}>
                            {categories?.map((item, index) => (
                                <Link
                                    href={`/category/${item.ID}`}
                                    className={styles.card}
                                    key={`${item.Name}-${index}`}
                                >
                                    <div className={styles.imageContainer}>
                                        <Image
                                            src={item.IconURL}
                                            alt={`thumb-${index}`}
                                            width={118}
                                            height={118}
                                            className={styles.image}
                                        />
                                    </div>
                                    <h3 className={styles.title}>{item.Name}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.mobileContainer}>
                <AccordionCatalog categories={categories!}/>
            </div>
        </>
    );
}

type Props = {
    categories: Category[]
}

const AccordionCatalog = ({categories}: Props) => (
    <Accordion.Root
        className={styles.accordionRoot}
        type="multiple"
        defaultValue={["Категории товаров"]}
    >
        {accordionData.map(({title, items}) => (
            <Accordion.Item
                key={title}
                className={styles.accordionItem}
                value={title}
            >
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>
                    <div className={styles.accordionGrid}>
                        {categories?.map((item, i) => (
                            <Link
                               // className={styles.accordionCard}
                                href={`/category/${item.ID}`}>
                                <div key={`${title}-${i}`} className={styles.accordionCard}>
                                    <div className={styles.accordionImageContainer}>
                                        <Image
                                            src={item.IconURL}
                                            alt={item.Name}
                                            width={86}
                                            height={86}
                                            className={styles.accordionImage}
                                        />
                                    </div>
                                    <h2 className={styles.accordionTitle}>{item.Name}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                </AccordionContent>
            </Accordion.Item>
        ))}
    </Accordion.Root>
);

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    className?: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({children, className, ...props}, forwardedRef) => (
        <Accordion.Header className={styles.accordionHeader}>
            <Accordion.Trigger
                className={classNames(styles.accordionTrigger, className)}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon className={styles.accordionChevron} aria-hidden/>
            </Accordion.Trigger>
        </Accordion.Header>
    )
);

const AccordionContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
    ({children, className, ...props}, forwardedRef) => (
        <Accordion.Content
            className={classNames(styles.accordionContent, className)}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Accordion.Content>
    )
);

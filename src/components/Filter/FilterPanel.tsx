"use client";

import React, {useEffect, useRef, useState} from "react";
import {Button, Checkbox, Collapse, CollapseProps, InputNumber, Pagination, Slider, Switch,} from "antd";
import styles from "./FilterPanel.module.scss";
import SortOptions from "@/src/components/SortOption/SortOption";
import ProductList from "@/src/components/ProductList/ProductList";
import Tags from "@/src/components/Tags/page";

import {AvailableFilters, Product} from "@/app/globalRedux/model/caterogy/category.type";
import {useGetCategoryProductsNewMutation} from "@/app/globalRedux/model/product/product.api";
import {useParams} from "next/navigation";
import clsx from "clsx";
import Close from '../../../public/icons/closeButton.svg'
import {SortType} from "@/src/types/sortType";


type Props = {
    //  products: Product[],
    filters: AvailableFilters;
}

export default function FilterPanel({filters}: Props) {
    const params = useParams();
    const id = params?.id!;

    const [toggleFilter, setToggleFilter] = useState(false)
    const activeTags: { key: string; label: string; onClose: () => void }[] = [];

    const [fetchProducts, {data: filteredProducts, isLoading}] = useGetCategoryProductsNewMutation();
    const isFirstRender = useRef(true);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    // Преобразование брендов (если есть)
    const brandOptions = filters?.brands?.map(brand => ({
        label: brand.name,
        value: brand.id,
    })) ?? []; // если null, пустой массив


    // Цена
    const priceMin = filters?.price?.min ?? 0;
    const priceMax = filters?.price?.max ?? 0;

    // Состояния
    const [sortOption, setSortOption] = useState<SortType>('popular');
    const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
    const [installment, setInstallment] = useState(false);
    const [promotion, setPromotion] = useState(false);
    const [attributeValues, setAttributeValues] = useState<Record<number, number[]>>({});
    const [numberRanges, setNumberRanges] = useState<Record<number, [number, number]>>({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [canLoadMore, setCanLoadMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const node = loadMoreRef.current;
        if (!node || !canLoadMore || isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !isLoading && canLoadMore) {
                    setPage((prev) => prev + 1);
                }
            },
            {rootMargin: '200px'}
        );

        observer.observe(node);

        return () => {
            if (node) observer.unobserve(node);
        };
    }, [loadMoreRef.current, canLoadMore, isLoading]);

    useEffect(() => {
        const newProducts = filteredProducts?.data?.products ?? [];

        if (newProducts.length > 0) {
            setAllProducts((prev) => [...prev, ...newProducts]);
        }

        // if (page === 1) {
        //     setAllProducts(newProducts);
        // } else if (newProducts.length > 0) {
        //     setAllProducts((prev) => [...prev, ...newProducts]);
        // }

        // ✅ Остановить подгрузку, если продуктов пришло меньше лимита
        setCanLoadMore(newProducts.length === 20);

        // 👇 Сбросить флаг подгрузки
        setIsLoadingMore(false);
    }, [filteredProducts]);

    const getSortParams = (sortOption: SortType) => {
        switch (sortOption) {
            case 'priceAsc':
                return {order_by: 'price', sort_dir: 'asc'};
            case 'priceDesc':
                return {order_by: 'price', sort_dir: 'desc'};
            case 'popular':
            default:
                return {order_by: 'popular'};
        }
    };


    const [priceRange, setPriceRange] = useState<[number, number]>(() => {
        if (priceMin !== 0 && priceMax !== 0) {
            return [priceMin, priceMax];
        }
        return [0, 0];
    });

    useEffect(() => {
        setPage(0);
        setAllProducts([]);
    }, [
        selectedBrands,
        priceRange,
        attributeValues,
        numberRanges,
        installment,
        promotion,
        sortOption,
    ]);

    // Обработчик изменения цен — ограничиваем по min/max, если цена равна 0 — не даём вводить
    const handlePriceChange = (index: 0 | 1, value?: number) => {
        if (typeof value !== 'number') return;
        if (priceMin === priceMax && priceMin === 0) return; // Нет смысла менять

        const newRange: [number, number] = [...priceRange];
        newRange[index] = value;
        setPriceRange(newRange);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            const attributesArray = [];

            for (const attrId in attributeValues) {
                if (attributeValues[attrId]?.length) {
                    attributesArray.push({
                        attribute_id: +attrId,
                        values: attributeValues[attrId],
                    });
                }
            }

            for (const attrId in numberRanges) {
                const [min, max] = numberRanges[attrId];
                attributesArray.push({
                    attribute_id: +attrId,
                    min,
                    max,
                });
            }

            const {order_by, sort_dir} = getSortParams(sortOption);

            const params: any = {
                category_id: id,
                brand_ids: selectedBrands,
                min_price: priceRange[0],
                max_price: priceRange[1],
                attributes: JSON.stringify(attributesArray),
                installment,
                promotion,
                order_by,
                page,
                limit: 20,
                ...(sort_dir && {sort_dir}),
            };

            // 👇 Устанавливаем флаг isLoadingMore если это не первая страница
            if (page > 1) setIsLoadingMore(true);

            fetchProducts(params);
        }, 300);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [
        page,
        pageSize,
        selectedBrands,
        priceRange,
        attributeValues,
        numberRanges,
        installment,
        promotion,
        sortOption,
    ]);

    const dynamicAttributeFilters = filters?.attributes
        ?.filter(attr =>
            attr.type === 'ENUM' ||
            attr.type === 'STRING' ||
            attr.type === 'NUMBER'
        )?.map(attr => {
            if (attr.type === 'ENUM' || attr.type === 'STRING') {
                const options = attr.values.map(v => ({
                    label: v.value,
                    value: v.id,
                }));

                return {
                    key: `attribute-${attr.attribute_id}`,
                    className: styles.borderBottom,
                    label: attr.name,
                    styles: {
                        header: {paddingTop: '10px', paddingBottom: '10px', paddingLeft: '0', paddingRight: '0'},
                    },
                    children: (
                        <>
                            <div className={styles.brendsBlock}>
                                <Checkbox.Group
                                    className={styles.brandCheckboxes}
                                    options={options}

                                    value={attributeValues[attr.attribute_id] || []}
                                    onChange={(checked) =>
                                        setAttributeValues(prev => ({
                                            ...prev,
                                            [attr.attribute_id]: checked as number[],
                                        }))
                                    }
                                />
                            </div>
                            {/*<div className={styles.line}></div>*/}
                        </>


                    ),
                };
            }

            if (attr.type === 'NUMBER') {
                const numericValues = attr.values.map(v => parseFloat(v.value)).filter(Boolean);
                const min = Math.min(...numericValues);
                const max = Math.max(...numericValues);
                const currentRange = numberRanges[attr.attribute_id] || [min, max];

                return {
                    key: `attribute-${attr.attribute_id}`,
                    label: attr.name,
                    styles: {
                        header: {paddingTop: '10px', paddingBottom: '10px', paddingLeft: '0', paddingRight: '0'},
                    },
                    className: styles.borderBottom,
                    children: (
                        <>
                            <div className={styles.priceInputs}>
                                <InputNumber
                                    min={min}
                                    max={max}
                                    value={currentRange[0]}
                                    onChange={(val) =>
                                        setNumberRanges(prev => ({
                                            ...prev,
                                            [attr.attribute_id]: [val ?? min, currentRange[1]],
                                        }))
                                    }
                                />
                                <InputNumber
                                    min={min}
                                    max={max}
                                    value={currentRange[1]}
                                    onChange={(val) =>
                                        setNumberRanges(prev => ({
                                            ...prev,
                                            [attr.attribute_id]: [currentRange[0], val ?? max],
                                        }))
                                    }
                                />
                            </div>
                            <Slider
                                range
                                min={min}
                                max={max}
                                step={1}
                                value={currentRange}
                                onChange={(range) =>
                                    setNumberRanges(prev => ({
                                        ...prev,
                                        [attr.attribute_id]: range as [number, number],
                                    }))
                                }
                            />
                        </>
                    ),
                };
            }

            return null;
        }) ?? [];

    const filteredDynamicAttributeFilters = dynamicAttributeFilters.filter(
        (item): item is NonNullable<typeof item> => item != null
    );

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Бренды',
            className: styles.borderBottom,
            styles: {
                header: {paddingTop: '10px', paddingBottom: '10px', paddingLeft: '0', paddingRight: '0'},
            },
            children: brandOptions.length === 0 ? (
                <p>Нет доступных брендов</p>
            ) : (
                <>
                    <div className={styles.brendsBlock}>
                        <Checkbox.Group
                            className={styles.brandCheckboxes}
                            options={brandOptions}
                            value={selectedBrands}
                            onChange={(checkedValues) => setSelectedBrands(checkedValues as number[])}
                        />
                    </div>
                    {/*<div className={styles.line}></div>*/}
                </>
            ),
        },
        {
            key: '2',
            label: 'Стоимость',
            styles: {
                header: {paddingTop: '10px', paddingBottom: '10px', paddingLeft: '0', paddingRight: '0'},
            },
            className: styles.borderBottom,
            children: priceMin === priceMax && priceMin === 0 ? (
                <p>Фильтр по стоимости недоступен</p>
            ) : (
                <>
                    <div className={styles.priceInputs}>
                        <InputNumber
                            min={priceMin}
                            max={priceMax}
                            placeholder="от"
                            value={priceRange?.[0]}
                            onChange={(value) => handlePriceChange(0, value!)}
                        />
                        <InputNumber
                            min={priceMin}
                            max={priceMax}
                            placeholder="до"
                            value={priceRange?.[1]}
                            onChange={(value) => handlePriceChange(1, value!)}
                        />
                    </div>
                    <Slider
                        range
                        min={priceMin}
                        max={priceMax}
                        step={1000}
                        value={priceRange}
                        onChange={(value) => setPriceRange(value as [number, number])}
                    />
                </>
            ),
            showArrow: false,
        },
        {
            key: '3',
            styles: {
                header: {paddingTop: '10px', paddingBottom: '10px', paddingLeft: '0', paddingRight: '0'},
            },
            label: (
                <div style={{display: 'flex', color: '#000', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span>Рассрочка</span>
                    <Switch checked={installment} onChange={setInstallment}/>
                </div>
            ),
            collapsible: 'disabled',
            showArrow: false,
        },
        {
            key: '4',
            className: styles.borderBottom,
            styles: {
                header: {paddingTop: '10px', paddingBottom: '10px', paddingLeft: '0', paddingRight: '0'},
            },
            label: (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: '#000',
                            opacity: 1, // <-- визуальное отключение
                            //   pointerEvents: 'none', // если нужно запретить взаимодействие
                        }}
                    >
                        <span>Акция</span>
                        <Switch checked={promotion} onChange={setPromotion}/> {/* тоже можно заблокировать */}

                    </div>
                    {/*<div className={styles.line}></div>*/}
                </>

            ),

            collapsible: 'disabled',
            showArrow: false,
        },
        ...filteredDynamicAttributeFilters,
    ];


    // Бренды
    brandOptions.forEach(brand => {
        if (selectedBrands.includes(brand.value)) {
            activeTags.push({
                key: `brand-${brand.value}`,
                label: brand.label,
                onClose: () => {
                    setSelectedBrands(prev => prev.filter(id => id !== brand.value));
                },
            });
        }
    });

    // Цена
    if (priceMin !== priceMax && (priceRange[0] > priceMin || priceRange[1] < priceMax)) {
        activeTags.push({
            key: `price`,
            label: `Цена: ${priceRange[0]} - ${priceRange[1]}`,
            onClose: () => setPriceRange([priceMin, priceMax]),
        });
    }

    // Атрибуты ENUM и STRING
    filters?.attributes?.forEach(attr => {
        if ((attr.type === 'ENUM' || attr.type === 'STRING') && attributeValues[attr.attribute_id]?.length) {
            attr.values.forEach(v => {
                if (attributeValues[attr.attribute_id].includes(v.id)) {
                    activeTags.push({
                        key: `attr-${attr.attribute_id}-${v.id}`,
                        label: `${attr.name}: ${v.value}`,
                        onClose: () =>
                            setAttributeValues(prev => ({
                                ...prev,
                                [attr.attribute_id]: prev[attr.attribute_id].filter(id => id !== v.id),
                            })),
                    });
                }
            });
        }

        if (attr.type === 'NUMBER' && numberRanges[attr.attribute_id]) {
            const [min, max] = numberRanges[attr.attribute_id];
            activeTags.push({
                key: `attr-range-${attr.attribute_id}`,
                label: `${attr.name}: ${min} - ${max}`,
                onClose: () => {
                    setNumberRanges(prev => {
                        const newState = {...prev};
                        delete newState[attr.attribute_id];
                        return newState;
                    });
                },
            });
        }
    });

    // Рассрочка
    if (installment) {
        activeTags.push({
            key: 'installment',
            label: 'Рассрочка',
            onClose: () => setInstallment(false),
        });
    }

    // Акция
    if (promotion) {
        activeTags.push({
            key: 'promotion',
            label: 'Акция',
            onClose: () => setPromotion(false),
        });
    }

    const handleClearAllFilters = () => {
        setSelectedBrands([]);
        setPriceRange([priceMin, priceMax]);
        setAttributeValues({});
        setNumberRanges({});
        setInstallment(false);
        setPromotion(false);
    };

    return (
        <>
            <div className={styles.filterHeaderMobile}>
                <Button
                    icon={
                        <img src="/catalog/sorting.svg" alt="sort" width={24} height={24}/>
                    }
                    className={styles.sortToggle}
                />
                <Button
                    onClick={() => setToggleFilter(!toggleFilter)}
                    icon={
                        <img
                            src="/catalog/filter_active.svg"
                            alt="filter"
                            width={24}
                            height={24}
                        />
                    }
                    className={styles.filterToggle}
                />
                <div className={styles.selectedFiltersMob}>
                    <Tags tags={activeTags} onClear={handleClearAllFilters}/>
                </div>
            </div>
            <div className={styles.content}>
                <div
                    className={clsx(styles.desktopSidebar, {
                        [styles.activeFilter]: toggleFilter,
                    })}>
                    <div className={styles.panel}>
                        <div className={styles.filterHeader}>
                            <p className={styles.titleFilter}>Фильтр</p>
                            <Close onClick={() => setToggleFilter(!toggleFilter)}/>
                        </div>
                        <Collapse
                            expandIcon={({isActive}) => <ArrowDown rotate={isActive}/>}
                            expandIconPosition="end"
                            defaultActiveKey={['1', '2',]}
                            ghost
                            items={items}
                        />
                    </div>
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.desktopControls}>
                        <Tags tags={activeTags} onClear={handleClearAllFilters}/>
                        <SortOptions value={sortOption} onChange={setSortOption}/>
                    </div>

                    <ProductList
                        isLoading={isLoading && page === 1}
                        isLoadingMore={isLoadingMore}
                        products={allProducts}
                        loadMoreRef={loadMoreRef}
                    />
                </div>
            </div>
        </>
    );
}

const ArrowDown = ({rotate = false}: { rotate?: boolean }) => {
    return (
        <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: rotate ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
            }}
        >
            <path
                d="M9 1L5 5L1 1"
                stroke="#344153"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

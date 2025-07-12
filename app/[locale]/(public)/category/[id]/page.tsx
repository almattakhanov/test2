'use client'

import styles from "./Category.module.scss";
import SubCategory from "@/src/components/SubCategory/page";
import FilterPanel from "@/src/components/Filter/FilterPanel";
import ProductList from "@/src/components/ProductList/ProductList";
import {Breadcrumb} from "antd";
import {useEffect} from "react";
import {
    useGetCategoryFirstLevelQuery,
    useGetCategoryProductsMutation,
} from "@/app/globalRedux/model/caterogy/category.api";
import {useParams} from "next/navigation";
import {
    useGetCategoryProductsNewMutation,
    useLazyGetCategoryByIdQuery
} from "@/app/globalRedux/model/product/product.api";
import {useCategoryBreadcrumbs} from "@/app/hook/useCategoryBreadcrumbs";

export default function CategoryPage() {
    const params = useParams();
    const id = params?.id!;

    const [getCategoryProducts,] = useGetCategoryProductsMutation();
    const [getProducts, {data: productsData,}] = useGetCategoryProductsNewMutation()

    const breadcrumbs = useCategoryBreadcrumbs(+id);

    const selectedCategory = breadcrumbs?.at(-1)?.Name
    const categories = productsData?.data.available_filters.categories
    const total = productsData?.data.pagination.total
    const products = productsData?.data?.products
    const filters = productsData?.data?.available_filters

    useEffect(() => {
        if (id) {
            getCategoryProducts(+id);
            getProducts({category_id: +id});
        }
    }, [id, getCategoryProducts]);


    return (
        <div>
            <div className={styles.breadcrumbs}>
                <Breadcrumb
                    items={[
                        { title: <a href="/">Главная</a> },
                        ...breadcrumbs.map(cat => ({
                            title: <a href={`/category/${cat.ID}`}>{cat.Name}</a>
                        }))
                    ]}
                />
            </div>
            <div className={styles.pageTitle}>
                {selectedCategory}
                <span className={styles.pageTitleCount}>
                    {total} {pluralizeProduct(total ?? 0)}
                </span>
            </div>
            {
                total != 0 &&
                <>
                    <div>
                        <SubCategory
                            categories={categories!}/>
                    </div>
                    <div>
                        <div className={styles.FilterPanel}>
                            {
                                filters && <FilterPanel
                                    filters={filters}
                                   // products={products!}
                                />
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

const pluralizeProduct = (count: number): string => {
    if (count % 10 === 1 && count % 100 !== 11) return 'товар';
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'товара';
    return 'товаров';
};

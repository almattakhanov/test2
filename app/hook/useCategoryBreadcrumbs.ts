import {useEffect, useState} from "react";
import {useLazyGetCategoryByIdQuery} from "@/app/globalRedux/model/product/product.api";

export const useCategoryBreadcrumbs = (categoryId: number | string) => {
    const [getCategoryById] = useLazyGetCategoryByIdQuery();
    const [breadcrumbItems, setBreadcrumbItems] = useState<{ ID: number, Name: string }[]>([]);

    useEffect(() => {
        const loadBreadcrumbs = async () => {
            const res = await getCategoryById(+categoryId).unwrap();
            const path = res.data.Path; // "19/195"
            const ids = path.split('/').map(Number); // [19, 195]

            const breadcrumbs: { ID: number, Name: string }[] = [];

            for (const id of ids) {
                try {
                    const itemRes = await getCategoryById(id).unwrap();
                    breadcrumbs.push({ ID: itemRes.data.ID, Name: itemRes.data.Name });
                } catch (e) {
                    console.error('Ошибка загрузки категории:', id, e);
                }
            }

            setBreadcrumbItems(breadcrumbs);
        };

        if (categoryId) {
            loadBreadcrumbs();
        }
    }, [categoryId]);

    return breadcrumbItems;
};
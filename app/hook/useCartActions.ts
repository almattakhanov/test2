import {useDeleteProductCartMutation, useUpdateCartProductMutation} from '@/app/globalRedux/model/cart/cart.api';
import {CartProduct} from '@/app/globalRedux/model/cart/cart.type';

export const useCartActions = (notify: { success: (msg: string) => void; error: (msg: string) => void }) => {
    const [updateCartProduct, {isLoading: isUpdating}] = useUpdateCartProductMutation();
    const [deleteProduct, {isLoading: isDeleting}] = useDeleteProductCartMutation();

    const updateQuantity = async (item: CartProduct, newQuantity: number) => {
        if (isUpdating || isDeleting) return;

        try {
            if (newQuantity === 0) {
                await deleteProduct({
                    product_ids: [{company_product_id: item.company_product_id, company_id: 1}],
                }).unwrap();
                notify.success('Товар удалён из корзины');
            } else {
                await updateCartProduct({
                    company_id: 1,
                    company_product_id: item.company_product_id,
                    product_id: item.product_id,
                    quantity: newQuantity,
                }).unwrap();
                notify.success('Количество обновлено');
            }
        } catch (error) {
            notify.error('Ошибка при обновлении товара');
            console.error(error);
        }
    };

    const deleteSingleProduct = async (company_product_id: number) => {
        if (isDeleting) return;
        try {
            await deleteProduct({
                product_ids: [{company_product_id, company_id: 1}],
            }).unwrap();
            notify.success('Товар удалён из корзины');
        } catch (error) {
            notify.error('Ошибка при удалении товара');
            console.error(error);
        }
    };

    const deleteSelectedProducts = async (productIds: number[]) => {
        if (productIds.length === 0) return;
        try {
            await deleteProduct({
                product_ids: productIds.map(id => ({company_product_id: id, company_id: 1})),
            }).unwrap();
            notify.success('Товары успешно удалены из корзины');
        } catch (error) {
            notify.error('Произошла ошибка при удалении товаров');
            console.error(error);
        }
    };

    return {updateQuantity, deleteSingleProduct, deleteSelectedProducts, isUpdating, isDeleting};
};

import {useState} from 'react';
import {CartProduct, LocalCartType, ProductCartType} from '@/app/globalRedux/model/cart/cart.type';

type CartItemType = CartProduct | LocalCartType | ProductCartType;

export const useCartSelection = (cartItems: CartItemType[] | undefined) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const toggleItem = (productId: number) => {
        setSelectedItems(prev =>
            prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        );
    };

    const toggleSelectAll = () => {
        if (!cartItems) return;
        const allIds = cartItems.map(item => item.product_id);
        setSelectedItems(selectedItems.length === allIds.length ? [] : allIds);
    };

    const isItemSelected = (id: number) => selectedItems.includes(id);

    const isAllSelected = !!(cartItems && cartItems.length > 0 && selectedItems.length === cartItems.length);

    return {
        selectedItems,
        setSelectedItems,
        toggleItem,
        toggleSelectAll,
        isItemSelected,
        isAllSelected,
    };
};

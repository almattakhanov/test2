import { CartProduct, LocalCartType, ProductCartType } from '@/app/globalRedux/model/cart/cart.type';

export type CartItemType = CartProduct | LocalCartType | ProductCartType;

export function isCartProduct(item: CartItemType): item is CartProduct {
    return (item as CartProduct).delivery_info !== undefined;
}

export function isLocalCartItem(item: CartItemType): item is LocalCartType {
    return (
        typeof (item as LocalCartType).price === 'number' &&
        'image_url' in item &&
        'product_name' in item &&
        !isCartProduct(item)
    );
}

export function hasPriceAndQuantity(item: CartItemType): item is CartProduct | LocalCartType {
    return isCartProduct(item) || isLocalCartItem(item);
}

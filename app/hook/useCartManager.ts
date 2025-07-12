import { useEffect, useState } from 'react';
import {
    useGetCartQuery,
    useAddCartMutation,
    useDeleteProductCartMutation,
} from '@/app/globalRedux/model/cart/cart.api';

import {
    getLocalCart,
    addToLocalCart,
    removeFromLocalCart,
    clearLocalCart, updateLocalCartQuantity,
} from '@/src/utils/cartStorage';
import {CartProduct, DeleteProductType, LocalCartType, ProductCartType} from "@/app/globalRedux/model/cart/cart.type";



type UseCartManagerResult = {
    cartItems: LocalCartType[] | CartProduct[] | ProductCartType[];
    addItem: (item: ProductCartType) => Promise<void>;
    removeItem: (payload: DeleteProductType) => Promise<void>;
    clearCart: () => void;
    isInCart: (product_id: number) => boolean;
    increment: (item: any) => Promise<void>;
    decrement: (item: any) => Promise<void>;
    isLoading: boolean;

};

export const useCartManager = (isAuth: boolean): UseCartManagerResult => {
    const { data: serverCart, refetch,isLoading  } = useGetCartQuery(undefined, { skip: !isAuth });
    const [addProducts] = useAddCartMutation();
    const [removeProducts] = useDeleteProductCartMutation();

    const [cartItems, setCartItems] = useState<LocalCartType[] | CartProduct[] | ProductCartType[]>([]);

    const isInCart = (product_id: number) => {
        return cartItems.some(item => item.product_id === product_id);
    };

    const addItem = async (item: ProductCartType) => {
        if (isAuth) {
            try {
                await addProducts({ products: [item] }).unwrap();
                await refetch();
            } catch (e) {
                console.error('Ошибка добавления товара в корзину', e);
            }
        } else {
            addToLocalCart(item);
            setCartItems(getLocalCart());
            window.dispatchEvent(new Event('storage'));
        }
    };

    const increment = async (item: any) => {
        const current = cartItems.find(
            ( c: any ) => c.company_id === item.company_id && c.company_product_id === item.company_product_id
        );
        const newQty = (current?.quantity || 0) + 1;

        if (isAuth) {
            try {
                //  await updateQuantity(item.company_id, item.company_product_id, newQty);
            } catch (e) {
                console.error('Ошибка увеличения количества товара (auth)', e);
            }
        } else {
            updateLocalCartQuantity(item.company_id, item.company_product_id, newQty);
            setCartItems(getLocalCart());
            window.dispatchEvent(new Event('storage'));
        }
    };

    const decrement = async (item: any) => {
        const current = cartItems.find(
            (c: any) => c.company_id === item.company_id && c.company_product_id === item.company_product_id
        );
        const newQty = (current?.quantity || 1) - 1;

        if (isAuth) {
            try {
                //   await updateQuantity(item.company_id, item.company_product_id, newQty);
            } catch (e) {
                console.error('Ошибка уменьшения количества товара (auth)', e);
            }
        } else {
            updateLocalCartQuantity(item.company_id, item.company_product_id, newQty);
            setCartItems(getLocalCart());
            window.dispatchEvent(new Event('storage'));
        }
    };

    const removeItem = async (payload: DeleteProductType) => {
        if (isAuth) {
            try {
                await removeProducts({ product_ids: [payload] }).unwrap();
                await refetch();
            } catch (e) {
                console.error('Ошибка удаления товара из корзины', e);
            }
        } else {
            removeFromLocalCart(payload.company_id, payload.company_product_id);
            setCartItems(getLocalCart());
            window.dispatchEvent(new Event('storage'));
        }
    };

    const clearCart = () => {
        if (isAuth) {
            setCartItems([]);
        } else {
            clearLocalCart();
            setCartItems([]);
            window.dispatchEvent(new Event('storage'));
        }
    };

    useEffect(() => {
        if (isAuth && serverCart?.data?.products) {
            setCartItems(serverCart.data.products);
        } else {
            setCartItems(getLocalCart());
        }
    }, [isAuth, serverCart]);

    useEffect(() => {
        if (!isAuth) {
            const onStorageChange = () => {
                setCartItems(getLocalCart());
            };
            window.addEventListener('storage', onStorageChange);
            return () => window.removeEventListener('storage', onStorageChange);
        }
    }, [isAuth]);

    // Синхронизация localStorage -> сервер при авторизации
    useEffect(() => {
        const syncLocalToServer = async () => {
            const local = getLocalCart();
            if (isAuth && local.length > 0) {
                try {
                    await addProducts({ products: local }).unwrap();
                    clearLocalCart();
                    window.dispatchEvent(new Event('storage'));
                    await refetch();
                } catch (e) {
                    console.error('Ошибка при синхронизации корзины с сервером', e);
                }
            }
        };

        syncLocalToServer();
    }, [isAuth]);

    return {
        cartItems,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        increment,
        decrement,
        isLoading
    };
};


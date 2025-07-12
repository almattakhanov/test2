'use client';

import React, {useMemo} from 'react';
import styles from './CartPage.module.scss';
import {SelectAll} from '@/src/components/CartPage/SelectAll/ui/SelectAll';
import {CartItem} from '@/src/components/CartPage/CartItem/ui/CartItem';
import {CartSummary} from '@/src/components/CartPage/CartSummary/ui/CartSummary';
import Link from 'next/link';
import Image from 'next/image';
import {useI18n} from '@/locales/client';
import {EmptyState} from '@/src/components/EmptyState/ui/EmptyState';
import {useAuth} from '@/app/hook/useAuth';
import {useCartManager} from '@/app/hook/useCartManager';
import CartItemLocal from '@/src/components/CartPage/CartItemLocal/CartItemLocal';
import {useRouter} from 'next/navigation';
import {Skeleton} from 'antd';
import {useCartSelection} from '@/app/hook/useCartSelection';
import {useCartActions} from '@/app/hook/useCartActions';
import {formatCurrency} from '@/src/utils/formatCurrency';
import {useNotify} from '@/app/hook/useNotify';
import {hasPriceAndQuantity, isCartProduct, isLocalCartItem} from '@/src/utils/cartItemGuards';

const CartPage = () => {
    const { isAuth } = useAuth();
    const router = useRouter();
    const t = useI18n();
    const { notify, contextHolder } = useNotify();

    const { cartItems, increment, decrement, removeItem, isLoading: cartLoading } = useCartManager(isAuth);

    const {
        selectedItems,
        setSelectedItems,
        toggleItem,
        toggleSelectAll,
        isItemSelected,
        isAllSelected,
    } = useCartSelection(cartItems);

    const {
        updateQuantity,
        deleteSingleProduct,
        deleteSelectedProducts,
    } = useCartActions(notify);

    const disabledBtn =
        selectedItems.length === 0 ||
        cartItems?.some((item) => selectedItems.includes(item.product_id) && !item.is_active);

    const summary = useMemo(() => {
        if (!cartItems || cartItems.length === 0) return null;

        const total = cartItems.reduce((sum, item) => {
            if (hasPriceAndQuantity(item)) {
                return sum + item.price * item.quantity;
            }
            return sum;
        }, 0);

        const monthly = Math.ceil(total / 12);
        const final = monthly * 12;

        return {
            total: formatCurrency(total),      // оригинальная сумма
            discount: formatCurrency(0),       // скидки нет
            final: formatCurrency(final),      // сумма с учётом округления
            monthly: formatCurrency(monthly),  // платеж в месяц
        };
    }, [cartItems]);

    const selectedSummary = useMemo(() => {
        if (!cartItems) return null;
        const selected = cartItems.filter((item) => selectedItems.includes(item.product_id));
        const total = selected.reduce((sum, item) => {
            if (hasPriceAndQuantity(item)) {
                return sum + item.price * item.quantity;
            }
            return sum;
        }, 0);
        return {
            total: formatCurrency(total),
            discount: formatCurrency(0),
            final: formatCurrency(total),
            monthly: formatCurrency(Math.ceil(total / 12)),
        };
    }, [selectedItems, cartItems]);

    const handleDeleteSelected = async () => {
        if (!cartItems || selectedItems.length === 0) return;

        await deleteSelectedProducts(
            cartItems
                .filter((item) => selectedItems.includes(item.product_id))
                .map((item) => item.company_product_id)
        );
        setSelectedItems([]);
    };

    const handleCheckout = () => {
        if (!isAuth) {
            router.push(`/login?redirect=/cart-page`);
            return;
        }
        if (!cartItems) return;

        const payload = {
            items: cartItems
                .filter((item) => selectedItems.includes(item.product_id))
                .map((item) => ({
                    company_product_id: item.company_product_id,
                    company_id: item?.company_info?.company_id,
                    quantity: item.quantity,
                })),
        };
        sessionStorage.setItem('checkoutPayload', JSON.stringify(payload));
        router.push('/order');
    };

    const renderSkeletons = () => (
        <div className={styles.cartItems}>
            {[...Array(2)].map((_, idx) => (
                <Skeleton key={idx} active paragraph={{ rows: 3 }} style={{ marginBottom: 20 }} />
            ))}
        </div>
    );

    const renderCartItems = () => (
        <>
            <div className={styles.cartItems}>
                <SelectAll
                    onDeleteSelected={handleDeleteSelected}
                    onToggleAll={toggleSelectAll}
                    checked={isAllSelected}
                />
                {cartItems.map((item, index) => (
                    <React.Fragment key={item.product_id}>
                        {isCartProduct(item) ? (
                            <CartItem
                                item={item}
                                isSelected={isItemSelected(item.product_id)}
                                onToggle={() => toggleItem(item.product_id)}
                                onIncrement={() => updateQuantity(item, item.quantity + 1)}
                                onDecrement={() => updateQuantity(item, item.quantity - 1)}
                                deleteProduct={() => deleteSingleProduct(item.company_product_id)}
                            />
                        ) : isLocalCartItem(item) ? (
                            <CartItemLocal
                                item={item}
                                isSelected={isItemSelected(item.product_id)}
                                onToggle={() => toggleItem(item.product_id)}
                                onIncrement={() => increment(item)}
                                onDecrement={() => decrement(item)}
                                deleteProduct={() => {
                                    removeItem({
                                        company_id: item.company_id,
                                        company_product_id: item.company_product_id,
                                    });
                                    notify.success('Товар удалён из корзины');
                                }}
                            />
                        ) : null}
                        {index !== cartItems.length - 1 && <div className={styles.line}></div>}
                    </React.Fragment>
                ))}
            </div>
            <CartSummary
                disabledBtn={disabledBtn}
                handleCheckout={handleCheckout}
                summary={selectedItems.length > 0 ? selectedSummary! : summary!}
            />
        </>
    );

    return (
        <div className={styles.cartWrapper}>
            {contextHolder}

            <Link href="/" className={styles.title}>
                <Image src="/icons/arrow_l.svg" alt="стрелка влево" width={24} height={24} unoptimized />
                <h2>Корзина</h2>
            </Link>

            <div className={styles.cartContent}>
                {cartLoading
                    ? renderSkeletons()
                    : cartItems && cartItems.length > 0
                        ? renderCartItems()
                        : !cartLoading && cartItems?.length === 0 && (
                        <EmptyState
                            imageSrc="/images/cart-empty.png"
                            title="Пока ничего нет"
                            actionText="В каталог"
                            actionHref="/catalog"
                        />
                    )}
            </div>
        </div>
    );
};

export default CartPage;

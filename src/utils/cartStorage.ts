import {ProductCartType} from "@/app/globalRedux/model/cart/cart.type";

export const LOCAL_CART_KEY = 'local_cart';

export const getLocalCart = (): ProductCartType[] => {
    try {
        const data = localStorage.getItem(LOCAL_CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const addToLocalCart = (item: ProductCartType) => {
    const cart = getLocalCart();
    const index = cart.findIndex(
        c => c.company_id === item.company_id && c.company_product_id === item.company_product_id
    );

    if (index >= 0) {
        cart[index].quantity += item.quantity;
    } else {
        cart.push(item);
    }

    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
};

export const updateLocalCartQuantity = (
    company_id: number,
    company_product_id: number,
    newQuantity: number
) => {
    const cart = getLocalCart();
    const index = cart.findIndex(
        c => c.company_id === company_id && c.company_product_id === company_product_id
    );

    if (index >= 0) {
        if (newQuantity <= 0) {
            cart.splice(index, 1); // удаляем товар
        } else {
            cart[index].quantity = newQuantity;
        }
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
    }
    window.dispatchEvent(new Event('storage'));
};

export const removeFromLocalCart = (company_id: number, company_product_id: number) => {
    const cart = getLocalCart();
    const updated = cart.filter(
        c => !(c.company_id === company_id && c.company_product_id === company_product_id)
    );
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
};

export const clearLocalCart = () => {
    localStorage.removeItem(LOCAL_CART_KEY);
    window.dispatchEvent(new Event('storage'));
};
import React from 'react';
import styles from './ThreeMonthPlanTab.module.scss';
import {Rate} from "antd";
import Image from "next/image";
import {useParams, useRouter} from 'next/navigation';
import {Offer, ProductData} from "@/app/globalRedux/model/product/product.type";
import {useAddCartMutation, useGetCartQuery} from "@/app/globalRedux/model/cart/cart.api";
import {useCartManager} from "@/app/hook/useCartManager";
import {useAuth} from "@/app/hook/useAuth";
import {useNotify} from "@/app/hook/useNotify";
import {OrderCheckoutRequest} from "@/app/globalRedux/model/order/order.type";
import {formatPrice} from "@/src/utils/helpers";


type Props = {
    module?: boolean;
    offers: Offer[];
    selectedPayment: string;
    selectedMonths: number;
    setIsModalOpenAction: (isOpen: boolean) => void;
    product: ProductData
};

export const ThreeMonthPlanTab = (
    {
        module,
        offers,
        selectedPayment,
        selectedMonths,
        product,
        setIsModalOpenAction
    }: Props) => {

    const router = useRouter();
    const params = useParams();
    const id = params?.id!;
    const {isAuth} = useAuth()
    const {notify, contextHolder} = useNotify();

    // Подключаем хук управления корзиной
    const {addItem, isInCart} = useCartManager(isAuth);

    const filteredOffers = offers?.filter((offer) => {
        const {payment_info} = offer;

        if (selectedPayment === 'Картой') {
            return payment_info.card?.is_active;
        }

        if (selectedPayment === 'Рассрочка') {
            const terms = payment_info.installment?.terms;
            return payment_info.installment?.is_active && terms && selectedMonths.toString() in terms;
        }

        if (selectedPayment === 'Кредит') {
            const terms = payment_info.credit?.terms;
            return payment_info.credit?.is_active && terms && selectedMonths.toString() in terms;
        }

        return false;
    });

    const handleAddToCart = async (offer: typeof filteredOffers[0]) => {
        const productPayload = {
            company_id: offer.company_id,
            company_product_id: offer.company_product_id,
            product_id: +id,
            quantity: 1,
            product_name: product.name,
            image_url: product.image_urls[0],
            price: product.price,
            is_active: true
        };

        // Проверяем, если товар уже в корзине
        if (isInCart(productPayload.product_id)) {
            notify.info('Товар уже в корзине');
            if (setIsModalOpenAction) {
                setIsModalOpenAction(false);
            }
            return;
        }
        try {
            await addItem(productPayload);
            notify.success('Товар добавлен в корзину');
            if (setIsModalOpenAction) {
                setIsModalOpenAction(false);
            }
        } catch (error) {
            console.error('Ошибка при добавлении в корзину', error);
        }
    };
    const handleCheckout = (offer: Offer) => {
        const payload: OrderCheckoutRequest = {
            // user_id: 1,
            // city_id: 1,
            items: [
                {
                    company_product_id: offer.company_product_id,
                    company_id: offer.company_id,
                    quantity: 1,
                },
            ],
        };

        sessionStorage.setItem('checkoutPayload', JSON.stringify(payload));
        router.push('/order');
    };

    return (
        <div className={`${styles.wrapper} ${module ? styles.moduleWrapper : ''}`}>
            {contextHolder}
            {filteredOffers?.map((offer, index) => (
                <React.Fragment key={`${offer.company_product_id}_${index}`}>
                    <div className={styles.card}>
                        <div className={styles.priceSection}>
                            <div className={styles.price}>{formatPrice(offer.price)} с</div>
                            {selectedPayment !== 'Картой' && (
                                <div className={styles.installment}>
                                    {(() => {
                                        const terms =
                                            selectedPayment === 'Рассрочка'
                                                ? offer.payment_info.installment.terms
                                                : offer.payment_info.credit.terms;

                                        const percent = terms?.[selectedMonths.toString()] ?? 0;

                                        const totalPrice = offer.price;
                                        const monthlyPayment = Math.ceil(totalPrice / selectedMonths); // округляем вверх
                                        const totalPaid = monthlyPayment * selectedMonths;

                                        return (
                                            <div className={styles.installment}>
                                                <p>{formatPrice(monthlyPayment)} с</p>
                                                <span>× {selectedMonths} мес</span>
                                                {/* При необходимости можно отобразить переплату:
                                                  {totalPaid > totalPrice && (
                                                    <span className={styles.overpay}>
                                                      Переплата: {formatPrice(totalPaid - totalPrice)} с
                                                    </span>
                                                  )} */}
                                            </div>
                                        );
                                    })()}
                                </div>
                            )}

                        </div>
                        <div className={styles.seller}>{offer.company_name}</div>
                        <div className={styles.rating}>
                            <Rate
                                allowHalf
                                value={offer.average_rating}
                                style={{fontSize: 14}}
                                disabled
                            />
                            <span className={styles.review}>
                                {offer.average_rating}, {offer.reviews_count} отзывов
                            </span>
                        </div>
                        <div className={styles.delivery}>
                            <Image src="/icons/delivery.svg" alt="delivery" width={16} height={16}/>
                            <div className={styles.deliveryText}>
                                <span>Доставка</span>
                                <span>•</span>
                                <p>
                                    {offer.delivery_info.delivery.enabled
                                        ? `${offer.delivery_info.delivery.label || 'Доступна'}${offer.delivery_info.delivery.is_free ? ' • Бесплатно' : ''}`
                                        : 'Недоступна'}
                                </p>
                            </div>
                        </div>
                        {offer.delivery_info.pickup.enabled && (
                            <div className={styles.pickup}>
                                <Image src="/icons/selfDelivery.svg" alt="pickup" width={16} height={16}/>
                                <span>Самовывоз</span>
                            </div>
                        )}
                        <div className={styles.actions}>
                            <button onClick={() => {
                                if (!isAuth) {
                                    router.push(`/login?redirect=/product-page/${id}`)
                                    return
                                }
                                handleCheckout(offer)
                                //  router.push('/order')
                            }} className={styles.primaryBtn}>
                                Оформить
                            </button>
                            <button
                                className={styles.secondaryBtn}
                                onClick={() => handleAddToCart(offer)}
                            >
                                В корзину
                            </button>
                        </div>
                    </div>
                    {index !== filteredOffers.length - 1 && <div className={styles.divider}/>}
                </React.Fragment>
            ))}
        </div>
    );
};

import styles from "@/src/components/OrderPage/Checkout/ui/CheckoutForm.module.scss";
import React from "react";

export const pickupLocations = [
    {
        label: (
            <>
                <div className={styles.pickupTitle} >ул. Тоголок Молдо, 53</div>
                <div className={styles.time}>
                    Сегодня с 9:00 до 21:00
                    <img src={"/order/time.svg"} width="16" height="16" alt="Time Icon"/>
                </div>
            </>
        ),
        value: "Location1",
    },
    {
        label: (
            <>
                <div className={styles.pickupTitle}>Торговый центр «Ош», ул. Ташкентская, 1</div>
                <div className={styles.time}>
                    Сегодня с 9:00 до 21:00
                    <img src={"/order/time.svg"} width="16" height="16" alt="Time Icon"/>
                </div>
            </>
        ),
        value: "Location2",
    },
    {
        label: (
            <>
                <div className={styles.pickupTitle}>ул. Чуй, 210, пом.2</div>
                <div className={styles.time}>
                    Сегодня с 9:00 до 21:00{" "}
                    <img src={"/order/time.svg"} width="16" height="16" alt="Time Icon"/>
                </div>
            </>
        ),
        value: "Location3",
    },
];

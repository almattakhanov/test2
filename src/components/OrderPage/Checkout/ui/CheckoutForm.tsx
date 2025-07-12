"use client";

import React, {useEffect, useRef, useState} from "react";
import styles from "./CheckoutForm.module.scss";
import {Collapse, Flex, Input, InputRef, Radio, Switch} from "antd";
import {pickupLocations} from "@/src/components/OrderPage/Checkout";
import {Address} from "@/app/globalRedux/model/address/address.type";
import {useGetUserQuery} from "@/app/globalRedux/model/user/user.api";
import TextArea from "antd/es/input/TextArea";
import Add from '../../../../../public/icons/add.svg'
import Edit from '../../../../../public/icons/edit.svg'
import {AddressModule} from "@/src/components/AddressModule/ui/AddressModule";
import {useUpdateAddressMutation} from "@/app/globalRedux/model/address/address.api";
import {useNotify} from "@/app/hook/useNotify";
import {useI18n} from "@/locales/client";

const {Panel} = Collapse;

interface PickupPoint {
    pickup_point_id: number;
    code: string;
    name: string;
    address: string;
    coordinates: string;
    work_schedule: string;
}

interface DeliveryOption {
    type: "delivery" | "pickup";
    enabled: boolean;
    name: string;
    delivery?: string;
    price: number;
    is_free: boolean;
    delivery_type_id: number;
    available_from?: string;
    pickup_points?: PickupPoint[];
}

interface CheckoutFormProps {
    deliveryOptions: DeliveryOption[] | undefined;
    deliveryType: string;
    onDeliveryTypeChange: (value: string) => void;
    pickupPoint: string;
    onPickupPointChange: (value: string) => void;
    userAddresses: Address[];
    selectedAddressId: number
    setSelectedAddressId: (value: number) => void;
    firstName: string;
    setFirstName: (value: string) => void;
    phone: string;
    setPhone: (value: string) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = (
    {

        deliveryOptions,
        deliveryType,
        onDeliveryTypeChange,
        pickupPoint,
        onPickupPointChange,
        userAddresses,
        setFirstName,
        setPhone,
        firstName,
        phone,
        selectedAddressId,
        setSelectedAddressId
    }) => {
    const {notify, contextHolder} = useNotify();
    const t = useI18n();

    const {data: userData} = useGetUserQuery();
    const nameInputRef = useRef<InputRef>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateAddress] = useUpdateAddressMutation();

    const [editAddress, setEditAddress] = useState<Address | null>(null);

    useEffect(() => {
        if (!userData?.data?.first_name) {
            nameInputRef.current?.focus();
        }
    }, [userData]);

    const defaultAddress = userAddresses.find((a) => a.ID === selectedAddressId);
    const [lat, lng] = defaultAddress?.Coordinates?.split(",") ?? [];

    // const [firstName, setFirstName] = useState<string>(userData?.data?.FirstName ?? '');
    // const [phone, setPhone] = useState<string>(userData?.data?.PhoneNumber ?? '');

    useEffect(() => {
        if (userData?.data?.first_name) {
            setFirstName(userData.data.first_name);
        }
        if (userData?.data?.phone_number) {
            const formatted = formatKyrgyzPhone(userData.data.phone_number);
            setPhone(formatted);
        }
    }, [userData]);

    if (!deliveryOptions || deliveryOptions.length === 0)
        return <div>Нет данных о способах доставки</div>;

    const enabledOptions = deliveryOptions.filter((opt) => opt.enabled);
    const pickupOption = deliveryOptions.find((opt) => opt.type === "pickup");


    const handleUpdate = async (id: number, data: any) => {
        try {
            await updateAddress({id, data}).unwrap();
            notify.success(t('address.updateSuccess'));
            setIsModalOpen(false);
            setEditAddress(null);
        } catch (error) {
            notify.error(t('address.updateError'));
        }
    };

    const handleEdit = (address: Address) => {
        setEditAddress(address);
        setIsModalOpen(true);
    };


    return (
        <Flex vertical gap={24} className={styles.checkout}>
            {/*<div>*/}
            {/*    <h2 className={styles.title}>Данные покупателя</h2>*/}
            {/*    <Flex className={styles.infoGroup} gap={16}>*/}
            {/*        <Flex vertical className={styles.inputGroup}>*/}
            {/*            <label className={styles.label}>Имя</label>*/}
            {/*            <Input*/}
            {/*                ref={nameInputRef}*/}
            {/*                value={firstName}*/}
            {/*                onChange={(e) => setFirstName(e.target.value)}*/}
            {/*                className={styles.input}*/}
            {/*                placeholder="Имя"*/}
            {/*            />*/}
            {/*        </Flex>*/}
            {/*        <Flex vertical className={styles.inputGroup}>*/}
            {/*            <label className={styles.label}>Телефон</label>*/}
            {/*            <Input*/}
            {/*                value={phone}*/}
            {/*                onChange={(e) => {*/}
            {/*                    const formatted = formatKyrgyzPhone(e.target.value);*/}
            {/*                    setPhone(formatted);*/}
            {/*                }}*/}
            {/*                onPaste={(e) => {*/}
            {/*                    e.preventDefault();*/}
            {/*                    const pasted = e.clipboardData.getData('text');*/}
            {/*                    const formatted = formatKyrgyzPhone(pasted);*/}
            {/*                    setPhone(formatted);*/}
            {/*                }}*/}
            {/*                className={styles.input}*/}
            {/*                placeholder="+996 (ХХХ) ХХ-ХХ-ХХ"*/}
            {/*            />*/}
            {/*        </Flex>*/}
            {/*    </Flex>*/}
            {/*</div>*/}

            <div>
                <h2 className={styles.title}>Способ доставки</h2>
                <Radio.Group
                    block
                    className={styles.deliveryMethod}
                    value={deliveryType}
                    onChange={(e) => onDeliveryTypeChange(e.target.value)}
                    optionType="button"
                >
                    {enabledOptions.map((opt) => (
                        <Radio.Button key={opt.delivery_type_id} value={opt.type}>
                            {opt.name} {opt.is_free ? "(Бесплатно)" : `(+${opt.price} с)`}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </div>

            {deliveryType === "pickup" && pickupOption?.pickup_points && (
                <div className={styles.block}>
                    <h3 className={styles.subtitle}>Адреса для самовывоза</h3>
                    <Flex vertical className={styles.pickupGroup}>
                        {pickupOption.pickup_points.map((location) => {
                            const pickupId = location.pickup_point_id.toString();
                            return (
                                <Radio
                                    key={location.pickup_point_id}
                                    value={pickupId}
                                    className={styles.option}
                                    checked={pickupPoint === pickupId}
                                    onChange={() => onPickupPointChange(pickupId)}
                                >
                                    <b>{location.name}</b>, {location.address} <br/>
                                    <small>{location.work_schedule}</small>
                                </Radio>
                            );
                        })}
                    </Flex>
                </div>
            )}
            {deliveryType === "delivery" && (
                <div className={styles.block}>
                    <h3 className={styles.subtitle}>Адрес доставки</h3>
                    <Radio.Group
                        onChange={(e) => setSelectedAddressId(e.target.value)}
                        value={selectedAddressId}
                        className={styles.addressList}
                    >
                        {userAddresses.map((addr) => (
                            <div key={addr.ID} className={styles.addressItem}>
                                <Radio value={addr.ID}>
                                     <span className={styles.addressText}>
                                         {addr.Address}
                                         {addr.Apartment && `, кв. ${addr.Apartment}`}
                                         {addr.Entrance && `, подъезд ${addr.Entrance}`}
                                         {addr.Intercom && `, код домофона ${addr.Intercom}`}
                                         {addr.Floor && `, этаж ${addr.Floor}`}
                                     </span>
                                </Radio>
                                <button
                                    onClick={() => handleEdit(addr)}
                                    className={styles.editBnt}>
                                    <Edit/>
                                </button>
                            </div>
                        ))}
                    </Radio.Group>

                    <button
                        onClick={() => {
                            setEditAddress(null);
                            setIsModalOpen(true);
                        }}
                        className={styles.addAddressBtn}
                    >
                        <Add/> Добавить новый адрес
                    </button>

                    {lat && lng && (
                        <div className={styles.mapWrapper}>
                            <iframe
                                width="100%"
                                height="300"
                                frameBorder="0"
                                style={{border: 0}}
                                src={`https://www.google.com/maps?q=${lat},${lng}&hl=ru&z=16&output=embed`}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    )}
                </div>
            )}

            <AddressModule
                open={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditAddress(null);
                }}
                initialData={editAddress}
                onUpdate={handleUpdate}
            />
        </Flex>
    );
};


export function formatKyrgyzPhone(raw: string): string {
    let cleaned = raw.replace(/\D/g, '');

    if (cleaned.startsWith('996')) {
        cleaned = cleaned.slice(3);
    }

    cleaned = cleaned.slice(0, 9);

    const part1 = cleaned.slice(0, 3);
    const part2 = cleaned.slice(3, 5);
    const part3 = cleaned.slice(5, 7);
    const part4 = cleaned.slice(7, 9);

    let formatted = '+996';

    if (cleaned.length === 0) {
        // Если цифр нет, просто возвращаем +996 без пробелов и скобок
        return '';
    }

    if (cleaned.length <= 3) {
        // Если 3 и менее цифр — показываем просто без скобок и форматируем как набор цифр через пробел
        formatted += ' ' + cleaned;
    } else {
        // Если цифр 7 и больше — форматируем со скобками
        formatted += ` (${part1})`;
        if (part2) formatted += ` ${part2}`;
        if (part3) formatted += `-${part3}`;
        if (part4) formatted += `-${part4}`;
    }

    return formatted;
}

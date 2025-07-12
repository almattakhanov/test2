import React, {useEffect, useState} from 'react';
import styles from './Address.module.scss';
import {Empty, Popconfirm, Radio, Skeleton} from 'antd';
import Image from 'next/image';
import {useI18n} from '@/locales/client';
import {
    useDeleteAddressMutation,
    useGetAddressQuery,
    useSetDefaultAddressMutation,
    useUpdateAddressMutation,
} from '@/app/globalRedux/model/address/address.api';
import {AddressModule} from '@/src/components/AddressModule/ui/AddressModule';
import {useNotify} from '@/app/hook/useNotify';
import {addresses} from "@/app/[locale]/account/[section]/address/index";

type Address = {
    ID: number;
    UserID: number;
    CityId: number;
    Street: string;
    HouseNumber: string;
    Apartment: number | null;
    Comment: string;
    Coordinates: string;
    Entrance: string;
    Floor: number | null;
    Intercom: string;
    IsDefault: boolean;
};

export const Address = () => {

    const t = useI18n();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data, isLoading, refetch} = useGetAddressQuery();
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [editAddress, setEditAddress] = useState<Address | null>(null);

    const [deleteAddress, {isLoading: isDeleting}] = useDeleteAddressMutation();
    const [updateAddress] = useUpdateAddressMutation();
    const [setDefaultAddress] = useSetDefaultAddressMutation();
    const {notify, contextHolder} = useNotify();

    const handleChange = async (e: any) => {
        const addressId = e.target.value;
        setSelectedAddressId(addressId);

        try {
            await setDefaultAddress(addressId).unwrap();
            notify.success(t('address.setDefaultSuccess'));
            refetch();
        } catch (error) {
            notify.error(t('address.setDefaultError'));
            const mainAddress = data?.data.find(a => a.IsDefault);
            setSelectedAddressId(mainAddress?.ID ?? null);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteAddress(id).unwrap();
            notify.success(t('address.deleteSuccess'));
        } catch (error) {
            notify.error(t('address.deleteError'));
        }
    };

    const handleEdit = (address: Address) => {
        setEditAddress(address);
        setIsModalOpen(true);
    };

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

    useEffect(() => {
        if (data?.data && data.data.length > 0) {
            const mainAddress = data.data.find(a => a.IsDefault);
            setSelectedAddressId(mainAddress?.ID ?? data.data[0].ID);
        }
    }, [data]);

    return (
        <>
            {contextHolder}
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{t('address.myAddresses')}</h1>

                {isLoading ? (
                    <Skeleton active paragraph={{rows: 4}}/>
                ) : !data?.data || data.data.length === 0 ? (
                    <Empty description={t('noData') || 'Нет данных'}/>
                ) : (
                    <Radio.Group
                        onChange={handleChange}
                        value={selectedAddressId}
                        className={styles.container}
                    >
                        {data.data.map((address, index) => (
                            <React.Fragment key={address.ID}>
                                <div className={styles.items}>
                                    <Radio value={address.ID}>
                                          <span className={styles.addressText}>
                                              {address.Address}
                                              {address.Apartment && `, кв. ${address.Apartment}`}
                                              {address.Entrance && `, подъезд ${address.Entrance}`}
                                              {address.Intercom && `, код домофона ${address.Intercom}`}
                                              {address.Floor && `, этаж ${address.Floor}`}
                                            </span>
                                    </Radio>
                                    <div className={styles.item}>
                                        {address.IsDefault ? (
                                            <p className={styles.main}>{t('address.main')}</p>
                                        ) : (
                                            <p className={styles.makeMain}>{t('address.makeMain')}</p>
                                        )}
                                        <div className={styles.icons}>
                                            <button onClick={() => handleEdit(address)}>
                                                <Image
                                                    src="/icons/edit.svg"
                                                    alt={t('address.edit')}
                                                    width={24}
                                                    height={24}
                                                    unoptimized
                                                />
                                            </button>

                                            <Popconfirm
                                                title={t('address.deleteAddress')}
                                                okText={t('yes')}
                                                cancelText={t('cancellation')}
                                                onConfirm={() => handleDelete(address.ID)}
                                                okButtonProps={{loading: isDeleting}}
                                                disabled={address.IsDefault}
                                            >
                                                <button
                                                    disabled={isDeleting || address.IsDefault}
                                                    style={{
                                                        border: 'none',
                                                        background: 'transparent',
                                                        padding: 0,
                                                        cursor: address.IsDefault ? 'not-allowed' : 'pointer',
                                                        opacity: address.IsDefault ? 0.5 : 1,
                                                    }}
                                                >
                                                    <Image
                                                        src="/icons/delete.svg"
                                                        alt={t('address.delete')}
                                                        width={24}
                                                        height={24}
                                                        unoptimized
                                                    />
                                                </button>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                                {index < data.data.length - 1 && <div className={styles.line}></div>}
                            </React.Fragment>
                        ))}
                    </Radio.Group>
                )}

                <button
                    className={styles.button}
                    onClick={() => {
                        setEditAddress(null);
                        setIsModalOpen(true);
                    }}
                >
                    <Image
                        src="/icons/add.svg"
                        alt={t('address.addAddress')}
                        width={24}
                        height={24}
                        unoptimized
                    />
                    <p>{t('address.addAddress')}</p>
                </button>

                <AddressModule
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditAddress(null);
                    }}
                    initialData={editAddress}
                    onUpdate={handleUpdate}
                />
            </div>
        </>
    );
};

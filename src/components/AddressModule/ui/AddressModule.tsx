import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Input, Modal, Row} from 'antd'
import styles from './AddressModule.module.scss'
import {useCreateAddressMutation} from '@/app/globalRedux/model/address/address.api'
import {useNotify} from '@/app/hook/useNotify'
import {useI18n} from '@/locales/client'
import GoogleMapCart from "@/src/components/GoogleMapCart/GoogleMapCart";

type Props = {
    open: boolean
    onClose: () => void
    initialData?: any | null
    onUpdate?: (id: number, data: any) => void
}

type FormValues = {
    street: string
    apartment: string
    entrance: string
    code: string
    floor: string
    comment?: string
}

export const AddressModule = ({open, onClose, initialData, onUpdate}: Props) => {
    const t = useI18n()
    const [form] = Form.useForm<FormValues>()
    const [createAddress, {isLoading}] = useCreateAddressMutation()
    const {notify, contextHolder} = useNotify()
    const {TextArea} = Input
    const [coordinates, setCoordinates] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');


    useEffect(() => {
        if (open) {
            if (initialData) {
                form.setFieldsValue({
                    apartment: initialData.Apartment?.toString() || '',
                    entrance: initialData.Entrance || '',
                    code: initialData.Intercom || '',
                    floor: initialData.Floor?.toString() || '',
                    comment: initialData.Comment || '',
                });
                setInputValue(initialData.Address || '');
                setCoordinates(initialData.Coordinates || '');
            } else {
                form.resetFields();
                setInputValue('');
                setCoordinates('');
            }
        }
    }, [open, initialData, form]);

    const handleSubmit = async (values: FormValues) => {
        const trimmedAddress = inputValue.trim();
        const trimmedApartment = values.apartment?.trim() || '';

        if (!trimmedAddress) {
            notify.info('Пожалуйста, введите адрес');
            return;
        }

        if (!trimmedApartment) {
            notify.info('Пожалуйста, введите номер квартиры');
            return;
        }

        const body = {
            address: trimmedAddress,
            apartment: Number(trimmedApartment),
            city_id: 1,
            comment: values.comment?.trim() || '',
            coordinates: coordinates,
            entrance: values.entrance?.trim() || '',
            floor: Number(values.floor) || 0,
            house_number: '',
            intercom: values.code?.trim() || '',
            is_default: false,
            street: values.street?.trim() || '',
            user_id: 1,
        };

        try {
            if (initialData && onUpdate) {
                await onUpdate(initialData.ID, body);
            } else {
                await createAddress(body).unwrap();
                notify.success(t('address.addressModule.successAddMessage'));
            }
            form.resetFields();
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении адреса:', error);
            notify.error(
                t('address.addressModule.errorSaveTitle'),
                t('address.addressModule.errorSaveDescription')
            );
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                width={607}
                open={open}
                onCancel={() => {
                    onClose();
                    form.resetFields();
                    setInputValue('');
                    setCoordinates('');
                }}
                footer={null}
                centered
                closable
                closeIcon={<img src="/icons/closeButton.svg" alt={t('close')} width={24} height={24}/>}
                className={styles.modal}
                title={<h2
                    className={styles.title}>{initialData ? t('address.addressModule.titleEdit') : t('address.addressModule.titleAdd')}</h2>}
            >
                {open && (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className={styles.form}
                    >
                        <GoogleMapCart
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            onCoordinatesChange={setCoordinates}/>

                        {/*<Form.Item*/}
                        {/*    label={<span className={styles.label}>{t('address.addressModule.streetLabel')}</span>}*/}
                        {/*    name="street"*/}
                        {/*    rules={[{required: true, message: t('address.addressModule.streetRequired')}]}*/}
                        {/*>*/}
                        {/*    <Input placeholder={t('address.addressModule.streetPlaceholder')} className={styles.input}/>*/}
                        {/*</Form.Item>*/}

                        <Row gutter={12}>
                            <Col xs={24} sm={12} md={12} lg={6}>
                                <Form.Item
                                    label={<span
                                        className={styles.label}>{t('address.addressModule.apartmentLabel')}</span>}
                                    name="apartment"
                                    rules={[{required: true, message: t('address.addressModule.apartmentRequired')}]}
                                >
                                    <Input placeholder={t('address.addressModule.apartmentPlaceholder')}
                                           className={styles.input}/>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={6}>
                                <Form.Item
                                    label={<span
                                        className={styles.label}>{t('address.addressModule.entranceLabel')}</span>}
                                    name="entrance">
                                    <Input placeholder={t('address.addressModule.entrancePlaceholder')}
                                           className={styles.input}/>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={6}>
                                <Form.Item
                                    label={<span className={styles.label}>{t('address.addressModule.codeLabel')}</span>}
                                    name="code">
                                    <Input placeholder={t('address.addressModule.codePlaceholder')}
                                           className={styles.input}/>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={6}>
                                <Form.Item
                                    label={<span
                                        className={styles.label}>{t('address.addressModule.floorLabel')}</span>}
                                    name="floor">
                                    <Input placeholder={t('address.addressModule.floorPlaceholder')}
                                           className={styles.input}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label={<span className={styles.label}>{t('address.addressModule.commentLabel')}</span>}
                            name="comment">
                            <TextArea className={styles.textArea} rows={4}
                                      placeholder={t('address.addressModule.commentPlaceholder')}/>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                className={styles.submitButton}
                                loading={isLoading}
                            >
                                {initialData ? t('address.addressModule.saveChangesButton') : t('address.addressModule.saveButton')}
                            </Button>
                        </Form.Item>
                    </Form>
                )
                }
            </Modal>
        </>
    )
}

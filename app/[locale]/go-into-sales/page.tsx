'use client'

import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import React, {useState} from "react";
import styles from './goIntoSales.module.scss';
import {useI18n} from "@/locales/client";
import {Form, Input} from "antd";
import {BecomeSellerRequest, useSendMassageMutation} from "@/app/globalRedux/model/auth/api";
import {Button} from "@radix-ui/themes";


const Page = () => {
    const t = useI18n();

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<'vertical' | 'horizontal' | 'inline'>('horizontal');

    const [send, {data, isLoading}] = useSendMassageMutation()

    const onFormLayoutChange = ({layout}: { layout: 'vertical' | 'horizontal' | 'inline' }) => {
        console.log('Текущий layout формы:', layout);
        setFormLayout(layout);
    };

    const handleSubmit = (values: BecomeSellerRequest) => {
        send(values)
        console.log('Результаты формы:', values);
    };


    return (
        <>
            <div className='container'>
                <Header/>
                <main className={styles.main}>
                    <h1 className={styles.title}>{t('becomeSeller.title')}</h1>
                    <p className={styles.paragraph}>{t('becomeSeller.description')}</p>

                    <ul className={styles.list}>
                        <li>{t('becomeSeller.benefits.audience')}</li>
                        <li>{t('becomeSeller.benefits.installment')}</li>
                        <li>{t('becomeSeller.benefits.dashboard')}</li>
                        <li>{t('becomeSeller.benefits.support')}</li>
                    </ul>

                    <p className={styles.paragraph}>
                        {t('becomeSeller.cta')}
                    </p>

                    <Form
                        layout={formLayout}
                        form={form}
                        initialValues={{layout: formLayout}}
                        onValuesChange={onFormLayoutChange}
                        onFinish={handleSubmit}
                        style={{maxWidth: formLayout === 'inline' ? 'none' : 600}}
                        className={styles.formIntpoSales}
                    >
                        <Form.Item label="" name="name" rules={[{required: true, message: 'Введите имя'}]}>
                            <Input placeholder="Напишите имя"/>
                        </Form.Item>

                        <Form.Item label="" name="phone" rules={[{required: true, message: 'Введите номер телефона'}]}>
                            <Input placeholder="+996"/>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className={styles.submitBtn}
                                disabled={isLoading}
                                loading={isLoading}
                                type={'submit'}
                            >
                                Отправить
                            </Button>
                        </Form.Item>
                    </Form>

                    <p className={styles.paragraph}>
                        📞 {t('becomeSeller.questions')} <a href="tel:8585">8585</a> {t('becomeSeller.mobileFree')}
                    </p>
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default Page;
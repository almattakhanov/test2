'use client'

import {useEffect, useRef} from "react";
import {Button, Form, Input, InputRef} from "antd";
import styles from "./Profile.module.scss";
import { useCreateUserMutation, useGetUserQuery } from "@/app/globalRedux/model/user/user.api";
import { useI18n } from "@/locales/client";
import { useNotify } from "@/app/hook/useNotify";
import { mapUserToFormValues } from "@/src/lib/utils/userUtils";
import { validationRules } from "@/src/lib/validations/validationRules";
import { filterOnlyLetters } from "@/src/lib/utils/inputFilters";
import {filterEmail} from "@/src/utils/filterEmail";
import { useRouter } from 'next/navigation'

const initialFormData = {
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
    user_login: "",
    lang_code: "ru",
    inn: "",
    role: "C",
};

export const Profile = () => {
    const router = useRouter();
    const { data } = useGetUserQuery();
    const [createUser, { isLoading: isSubmitting }] = useCreateUserMutation();
    const t = useI18n();
    const { notify, contextHolder } = useNotify();
    const [form] = Form.useForm();
    const firstNameRef = useRef<InputRef>(null);

    useEffect(() => {
        if (data?.data) {
            form.setFieldsValue(mapUserToFormValues(data.data));
        }
    }, [data, form]);

    useEffect(() => {
        if (data?.data) {
            form.setFieldsValue(mapUserToFormValues(data.data));

            if (!data.data.first_name) {
                firstNameRef.current?.focus();
            }
        }
    }, [data, form]);


    const handleSubmit = async (values: typeof initialFormData) => {
        try {
            await createUser(values).unwrap();
            notify.success(t("user.success"), t("user.dataUpdated"));
            router.back();
        } catch (error) {
            console.error("Ошибка при отправке формы", error);
            notify.error(t("user.error"), t("user.dataUpdateError"));
        }
    };


    return (
        <div className={styles.wrapper}>
            {contextHolder}
            <h1 className={styles.title}>{t("user.profileTitle")}</h1>

            <Form
                form={form}
                layout="vertical"
                className={styles.form}
                initialValues={initialFormData}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label={t("user.firstName")}
                    name="firstname"
                    rules={[validationRules.required(t("validation.requiredField"))]}
                >
                    <Input
                        ref={firstNameRef}
                        className={styles.input}
                        placeholder={t("user.enterFirstName")}
                        onChange={(e) => {
                            const filtered = filterOnlyLetters(e.target.value);
                            form.setFieldsValue({ firstname: filtered });
                        }}
                    />
                </Form.Item>

                <Form.Item label={t("user.lastName")} name="lastname">
                    <Input
                        className={styles.input}
                        placeholder={t("user.enterLastName")}
                        onChange={(e) => {
                            const filtered = filterOnlyLetters(e.target.value);
                            form.setFieldsValue({ lastname: filtered });
                        }}
                    />
                </Form.Item>

                <Form.Item label={t("user.phoneNumber")} name="phone_number">
                    <Input className={styles.input} disabled />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        validationRules.required(t("validation.requiredField")),
                        {
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: t("validation.invalidEmail"),
                        },
                    ]}
                >
                    <Input
                        className={styles.input}
                        placeholder="example@example.com"
                        onChange={(e) => {
                            const filtered = filterEmail(e.target.value);
                            if (filtered !== e.target.value) {
                                form.setFieldsValue({ email: filtered });
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                        className={styles.button}
                    >
                        {isSubmitting ? t("user.saving") : t("user.save")}
                    </Button>
                </Form.Item>
            </Form>

            {/*<Button danger type="text" className={styles.buttonDelete}>*/}
            {/*    {t("user.deleteAccount")}*/}
            {/*</Button>*/}
        </div>
    );
};

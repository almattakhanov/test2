import { notification } from "antd";

export const useNotify = () => {
    const [api, contextHolder] = notification.useNotification();

    const success = (message: string, description?: string) => {
        api.success({
            message,
            description,
            placement: "bottomRight",
            showProgress: true,
        });
    };

    const error = (message: string, description?: string) => {
        api.error({
            message,
            description,
            placement: "bottomRight",
        });
    };

    const info = (message: string, description?: string) => {
        api.info({
            message,
            description,
            placement: "bottomRight",
        });
    };

    const warning = (message: string, description?: string) => {
        api.warning({
            message,
            description,
            placement: "bottomRight",
        });
    };

    return { notify: { success, error, info, warning }, contextHolder };
};

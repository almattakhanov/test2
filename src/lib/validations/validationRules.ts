export const validationRules = {
    required: (message: string) => ({ required: true, message }),
    email: (message: string) => ({ type: "email", message }),
    emailPattern: (message: string) => ({
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message,
    }),
    namePattern: (message: string) => ({
        pattern: /^[А-Яа-яA-Za-zёЁ]+$/,
        message,
    }),
};

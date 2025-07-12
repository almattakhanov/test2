export const filterOnlyLetters = (value: string) => {
    return value.replace(/[^А-Яа-яA-Za-zёЁ]/g, '');
};

type LanguageOption = {
    value: string;
    label: string;
    fullName: string;
    flag: string;
    labelSettings: string;
};

export const languageOptions: LanguageOption[] = [
    {value: 'ky', label: 'ky', fullName: 'Кыргызча (ky)', flag: '/flags/ky.svg', labelSettings: 'Кыргызча'},
    {value: 'ru', label: 'ru', fullName: 'Русский (ru)', flag: '/flags/ru.svg', labelSettings: 'Русский'},
    {value: 'en', label: 'en', fullName: 'English (en)', flag: '/flags/us.svg', labelSettings: 'English'},
];

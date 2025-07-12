export function formatKyrgyzPhone(raw: string): string {
    // Оставляем только цифры
    let cleaned = raw.replace(/\D/g, '');

    // Убираем префикс 996, если он есть
    if (cleaned.startsWith('996')) {
        cleaned = cleaned.slice(3);
    }

    // Обрезаем лишние цифры
    cleaned = cleaned.slice(0, 9);

    const part1 = cleaned.slice(0, 3);
    const part2 = cleaned.slice(3, 5);
    const part3 = cleaned.slice(5, 7);
    const part4 = cleaned.slice(7, 9);

    let formatted = '+996';

    if (part1) formatted += ` (${part1}`;
    if (part1.length === 3) formatted += `)`;
    if (part2) formatted += ` ${part2}`;
    if (part3) formatted += `-${part3}`;
    if (part4) formatted += `-${part4}`;

    return formatted;
}
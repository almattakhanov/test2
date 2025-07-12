export const filterEmail = (value: string): string => {
    let filtered = value;

    const parts = value.split('@');

    if (parts.length > 0) {
        let localPart = parts[0]
            .replace(/[^a-zA-Z0-9._%+-]/g, '')
            .replace(/^[._%+-]+/, '')
            .replace(/\.{2,}/g, '.')
            .replace(/([_%+-])+/g, '$1');


        if (parts.length > 1) {
            let domainPart = parts[1]
                .replace(/[^a-zA-Z0-9.-]/g, '')
                .replace(/^[.-]+/, '')
                .replace(/\.{2,}/g, '.')
                .replace(/-{2,}/g, '-');

            filtered = `${localPart}@${domainPart}`;
        } else {
            filtered = localPart;
        }
    }

    return filtered;
};

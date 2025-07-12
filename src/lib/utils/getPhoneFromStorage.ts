import {formatKyrgyzPhone} from "@/src/lib/format/formatKyrgyzPhone";

export function getPhoneFromStorage(): string | null {
    try {
        const auth = localStorage.getItem('auth');
        if (!auth) return null;

        console.log(auth,'auth')

        const {phone} = JSON.parse(auth);
        if (!phone) return null;

      //  return phone;
        return formatKyrgyzPhone(phone);
    } catch {
        return null;
    }
}

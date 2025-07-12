import {UserData} from "@/app/globalRedux/model/user/user.type";

export const mapUserToFormValues = (user: UserData) => ({
    firstname: user.first_name || "",
    lastname: user.last_name || "",
    phone_number: user.phone_number || "",
    user_login: user.user_login || "",
    email: user.email || "",
    inn: user.inn || "",
    role: user.role || "C",
    lang_code: user.lang_code || "ru",
});

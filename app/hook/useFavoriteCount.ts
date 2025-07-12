import { useEffect, useState } from "react";
import {useAuth} from "@/app/hook/useAuth";
import {useGetFavoritesQuery} from "@/app/globalRedux/model/favorites/favorites.api";
import {getLocalFavorites} from "@/src/utils/favoritesStorage";


export function useFavoriteCount() {
    const { isAuth } = useAuth();
    const { data: serverFavorites } = useGetFavoritesQuery(undefined, { skip: !isAuth });

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isAuth && serverFavorites?.data) {
            setCount(serverFavorites.data.length);
        } else {
            setCount(getLocalFavorites().length);
        }
    }, [isAuth, serverFavorites]);

    useEffect(() => {
        if (!isAuth) {
            const handleStorage = () => {
                setCount(getLocalFavorites().length);
            };

            window.addEventListener("storage", handleStorage);
            return () => window.removeEventListener("storage", handleStorage);
        }
    }, [isAuth]);

    return count;
}

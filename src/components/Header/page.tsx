"use client";

import {usePathname, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import {UserDropdown} from "@/src/components/DropdownMenu/DropdownMenu";
import {useI18n} from "@/locales/client";
import {LocaleSelect} from "@/src/components/LocaleSelect/ui/LocaleSelect";
import {SearchPopup} from "@/src/components/SearchPopup/ui/SearchPopup";
import {SettingsMenu} from "./components/SetttingMenu";
import {useAuth} from "@/app/hook/useAuth";
import {Skeleton} from "antd";
import {useLazySearchProductsQuery} from "@/app/globalRedux/model/product/product.api";
import CloseButton from '../../../public/icons/closeButton.svg';
import {useFavoriteCount} from "@/app/hook/useFavoriteCount";
import useOnclickOutside from "react-cool-onclickoutside";
import {useCartManager} from "@/app/hook/useCartManager";
import {Product} from "@/app/globalRedux/model/caterogy/category.type";

export function Header() {
    const {isAuth, isLoading} = useAuth()

    const {cartItems, addItem, isInCart} = useCartManager(isAuth);

    const t = useI18n();
    const [triggerSearch, {data: searchData, isLoading: isSearchLoading, isFetching}] = useLazySearchProductsQuery();

    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [query, setQuery] = useState("");
    const isLoadingSearch = isSearchLoading || isFetching
    const [isOpen, setIsOpen] = useState(false);
    //  const [language, setLanguage] = useState('ru');

    const [searchPage, setSearchPage] = useState(1);
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [hasMoreSearchResults, setHasMoreSearchResults] = useState(true);


    // const {data: cart} = useGetCartQuery()
    // const cartTotalQuantity = cart?.data?.cart_total_quantity && cart?.data?.cart_total_quantity > 0 ? cart?.data.cart_total_quantity : undefined;

    const favoriteCount = useFavoriteCount();

    const searchWrapperRef = useOnclickOutside(() => {
        setIsSearchActive(false);
    });

    const router = useRouter();
    const pathname = usePathname();
    const cleanPathActive = pathname.split('/').slice(2).join('/');


    useEffect(() => {
        if (query.trim().length < 2) return;

        const delayDebounce = setTimeout(() => {
            setSearchPage(1);
            setHasMoreSearchResults(true);

            // ✅ очищаем старые результаты
            setSearchResults([]);

            // запускаем поиск
            triggerSearch({query, page: 1});
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query, triggerSearch]);


    const popupRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isLoadingNextPageRef = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!popupRef.current || isSearchLoading || !hasMoreSearchResults || isLoadingNextPageRef.current) return;

            const {scrollTop, scrollHeight, clientHeight} = popupRef.current;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
                popupRef.current.dataset.prevScrollTop = String(scrollTop);

                isLoadingNextPageRef.current = true;
                const nextPage = searchPage + 1;
                setSearchPage(nextPage);
                triggerSearch({query, page: nextPage});
            }
        };

        const current = popupRef.current;
        current?.addEventListener('scroll', handleScroll);
        return () => current?.removeEventListener('scroll', handleScroll);
    }, [isSearchLoading, hasMoreSearchResults, searchPage, query]);


    useEffect(() => {
        if (!searchData?.data || !popupRef.current) return;

        const newProducts = searchData.data.products;
        const currentPage = searchData.data.pagination.page;
        const totalItems = searchData.data.pagination.total;
        const limit = searchData.data.pagination.limit;
        const estimatedTotalPages = Math.ceil(totalItems / limit);

        isLoadingNextPageRef.current = false;

        setSearchResults(prev =>
            currentPage === 1 ? newProducts : [...prev, ...newProducts]
        );

        setHasMoreSearchResults(currentPage < estimatedTotalPages);

        if (currentPage > 1) {
            const savedScrollTop = Number(popupRef.current.dataset.prevScrollTop || 0);

            requestAnimationFrame(() => {
                setTimeout(() => {
                    if (popupRef.current) {
                        popupRef.current.scrollTop = savedScrollTop;
                        // console.log("✅ Восстановили scrollTop:", savedScrollTop);
                        // console.log("scrollHeight:", popupRef.current.scrollHeight, "clientHeight:", popupRef.current.clientHeight);
                    }
                }, 0);
            });
        }
    }, [searchData]);


    //   const toggle = () => setIsOpen(prev => !prev);

    const handleClick = () => {
        router.push("/catalog");
    };


    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setIsScrollingDown(true);
            } else {
                setIsScrollingDown(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`${styles.header} ${isScrollingDown ? styles.hidden : ""}`}
        >
            <div className="container">
                <div className={styles.desktop}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/header/logo.svg"
                            alt="Logo"
                            width={157}
                            height={50}
                            className={styles.logoImage}
                        />
                        <Image
                            src="/header/small_logo.svg"
                            alt="Small Logo"
                            width={40}
                            height={40}
                            className={styles.logoImageSmall}
                        />
                    </Link>

                    <div className={styles.searchContainer}>
                        <button
                            onClick={handleClick}
                            className={styles.catalogButton}
                        >
                            <Image
                                src="/header/menu_alt.svg"
                                alt="Menu"
                                width={24}
                                height={24}
                                //  className={styles.menuAlt}
                            />
                            <span className={styles.label}>{t("catalog")}</span>
                        </button>

                        <div ref={searchWrapperRef} className={styles.refWrapper}>
                            <div className={`${styles.search} ${isSearchActive ? styles.active : ""}`}>
                                <Image
                                    src="/header/search.svg"
                                    alt="Search"
                                    width={24}
                                    height={24}
                                    className={styles.searchIcon}
                                />

                                <input
                                    type="text"
                                    placeholder={t("search")}
                                    className={styles.searchInputDesktop}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => setIsSearchActive(true)}
                                />

                                {isSearchActive && (
                                    <CloseButton
                                        style={{cursor: "pointer"}}
                                        onClick={() => setIsSearchActive(false)}
                                    />
                                )}
                            </div>

                            <SearchPopup
                                searchData={searchData}
                                popupRef={popupRef}
                                isLoading={isLoadingSearch}
                                isSearchActive={isSearchActive}
                                closePopup={() => setIsSearchActive(false)}
                                products={searchResults}
                            />
                        </div>
                    </div>


                    <nav className={styles.navContainer}>
                        <Link href="#" className={`${styles.navItem} ${styles.location}`}>
                            <Image
                                src="/header/navigation.svg"
                                alt="Location"
                                width={24}
                                height={24}
                                className={styles.icon}
                            />
                            <span className={styles.title}>{t("city")}</span>
                        </Link>

                        <Link href="/cart-page"
                              className={`${styles.navItem} ${cleanPathActive === "cart-page" ? styles.active : ""}`}>
                            <Image
                                src="/header/shopping_cart.svg"
                                alt="Cart"
                                width={24}
                                height={24}
                                className={styles.icon}
                            />
                            <div className={styles.cartWrapper}>
                                <span className={styles.title}>{t("cart")}</span>
                                {
                                    !!cartItems.length && <span className={styles.counter}>{cartItems.length}</span>
                                }
                                {/*{*/}
                                {/*    cartTotalQuantity && <span className={styles.counter}>{cartTotalQuantity}</span>*/}
                                {/*}*/}

                            </div>
                        </Link>

                        <Link href="/favorites"
                              className={`${styles.navItem} ${cleanPathActive === "favorites" ? styles.active : ""}`}>
                            <Image
                                src="/header/heart.svg"
                                alt="Favorites"
                                width={24}
                                height={24}
                                className={styles.icon}
                            />
                            <div className={styles.favWrapper}>
                                <span className={styles.title}>{t("favorites")}</span>
                                {favoriteCount > 0 && (
                                    <span className={styles.counter}>{favoriteCount}</span>
                                )}

                            </div>
                        </Link>

                        <div className={styles.localeDesktopWrapper}>
                            <LocaleSelect/>
                        </div>
                        <SettingsMenu
                            setIsOpen={setIsOpen}
                            isOpen={isOpen}
                        />

                        {isLoading ? (
                            <div className={styles.UserDropdown}>
                                <Skeleton.Button
                                    active
                                    size="small"
                                    style={{
                                        width: 100,
                                        height: 24,
                                        verticalAlign: 'middle'
                                    }}
                                />
                            </div>
                        ) : isAuth ? (
                            <div className={styles.UserDropdown}>
                                <UserDropdown/>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.navItem}>
                                <Image
                                    src="/header/enter.svg"
                                    alt="enter"
                                    width={24}
                                    height={24}
                                    className={styles.icon}
                                />
                                <div className={styles.favWrapper}>
                                    <span className={styles.title}> {t('login')}</span>
                                </div>
                            </Link>
                        )}
                    </nav>

                    {isOpen && (
                        <div className={styles.dropdown} ref={wrapperRef}>
                            <div className={styles.locationBlock}>
                                <Image src="/icons/location.svg" alt="location" width={16} height={16}/>
                                <span>Бишкек</span>
                            </div>

                            <div className={styles.languageList}>
                                <LocaleSelect variant={'fullWidth'}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

"use client";

import styles from "./SettingsMenu.module.scss";
import Image from "next/image";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const SettingsMenu = ({isOpen, setIsOpen}: Props) => {

    const toggle = () => setIsOpen(!isOpen);


    return (
        <div className={styles.wrapper}>
            <div
                className={`${styles.icon} ${isOpen ? styles.active : ''}`}
                onClick={toggle}
            >
                <Image
                    src={isOpen ? '/header/settings_active.svg' : '/header/settings.svg'}
                    alt="Settings"
                    width={24}
                    height={24}
                />
            </div>
        </div>
    );
};

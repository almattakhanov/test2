import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import styles from "@/src/components/DropdownMenu/DropdownMenu.module.scss";

type Props = {
    label: string
    path: string
    icon: React.ReactNode
    currentSection: string | undefined
}

export const MenuItem = ({ label, path, icon, currentSection }: Props) => {
    const isActive = currentSection === path

    return (
        <DropdownMenu.Item asChild>
            <Link
                href={`/account/${path}`}
                className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
            >
                <span className={styles.icon}>{icon}</span>
                {label}
            </Link>
        </DropdownMenu.Item>
    )
}

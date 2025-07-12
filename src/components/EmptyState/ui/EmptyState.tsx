import Image from 'next/image';
import Link from 'next/link';
import styles from './EmptyState.module.scss';

type EmptyStateProps = {
    title: string;
    imageSrc: string;
    actionText?: string;
    actionHref?: string;
};

export const EmptyState = (
    {
        title,
        imageSrc,
        actionText,
        actionHref,
    }: EmptyStateProps) => {
    return (
        <div className={styles.wrapper}>


            {title && <h2 className={styles.title}>{title}</h2>}


            <div className={styles.imageWrapper}>
                <Image
                    src={imageSrc}
                    alt={title}
                    width={398}
                    height={305}
                    className={styles.image}
                />
            </div>


            {actionText && actionHref && (
                <Link href={actionHref} className={styles.button}>
                    <span>{actionText}</span>
                    <Image
                        src="/icons/arrow_right.svg"
                        alt="стрелка вправо"
                        width={25}
                        height={24}
                        className={styles.arrowIcon}
                    />
                </Link>
            )}
        </div>
    );
};

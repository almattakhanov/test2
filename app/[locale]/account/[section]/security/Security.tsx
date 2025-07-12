'use strict';

import styles from './Security.module.scss'
import {Button} from "@radix-ui/themes";
import {useI18n} from "@/locales/client";

export const Security = () => {
    const t = useI18n();

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{t('security.title')}</h1>

            <Button
                className={styles.button}
                size="3"
                variant="solid"
                type="submit"
                // disabled={!isValid}
            >
                {t('security.logoutAllSessions')}
            </Button>
        </div>
    );
};
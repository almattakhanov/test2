import React from 'react';
import styles from './SelectAll.module.scss';
import {Checkbox} from 'antd';

export const SelectAll: React.FC<{
    onToggleAll: () => void;
    checked: boolean;
    onDeleteSelected: () => void;
}> = ({ onToggleAll, checked, onDeleteSelected }) => (
    <div className={styles.selectAll}>
        <div className={styles.selectContainer}>
            <Checkbox onChange={onToggleAll} checked={checked}>
                <span className={styles.text}>Выбрать все</span>
            </Checkbox>
        </div>
        <div
            className={styles.deleteSelected}
            onClick={onDeleteSelected}
            style={{ cursor: 'pointer' }}
        >
            Удалить выбранные
        </div>
    </div>
);
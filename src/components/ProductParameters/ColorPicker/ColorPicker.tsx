import { Segmented } from 'antd';
import styles from './ColorPicker.module.scss';

const colorOptions = [
    { value: 'gray', label: <div className={styles.colorSwatch} style={{ backgroundColor: '#eeeeee' }} /> },
    { value: 'black', label: <div className={styles.colorSwatch} style={{ backgroundColor: '#2b2b2b' }} /> },
    { value: 'blue', label: <div className={styles.colorSwatch} style={{ backgroundColor: '#1677ff' }} /> },
    { value: 'red', label: <div className={styles.colorSwatch} style={{ backgroundColor: '#ff5a5f' }} /> },
];

export const ColorPicker = () => (
    <div className={styles.parametersBlock}>
        <h3 className={styles.subTitle}>Цвет</h3>
        <div className={styles.segmentedWrapper}>
        <Segmented
            options={colorOptions}
            onChange={(value) => console.log(value)}
            size="large"
        />
        </div>
    </div>
);

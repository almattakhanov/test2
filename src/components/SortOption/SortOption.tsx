import React from 'react';
import styles from './SortOptions.module.scss';
import {SortType} from "@/src/types/sortType";

interface SortOptionsProps {
  value: SortType;
  onChange: (value: SortType) => void;
}

const options: { label: string; value: SortType }[] = [
  { label: 'Популярные', value: 'popular' },
  { label: 'Сначала дешевые', value: 'priceAsc' },
  { label: 'Сначала дорогие', value: 'priceDesc' },
  // { label: 'Со скидкой', value: 'sale' },
  // { label: 'Новинки', value: 'new' },
];

const SortOptions: React.FC<SortOptionsProps> = ({ value, onChange }) => {
  return (
    <div className={styles.sortOptions}>
      {options.map(option => (
        <button
          key={option.value}
          className={`${styles.button} ${
            value === option.value ? styles.active : ''
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortOptions;

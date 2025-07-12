"use client";

import React from "react";
import styles from "./Tags.module.scss";
import { Tag } from "antd";

type TagItem = {
  key: string;
  label: string;
  onClose: () => void;
};

type TagsProps = {
  tags: TagItem[];
  onClear?: () => void;
};

export default function Tags({ tags, onClear }: TagsProps) {
  return (
      <div className={styles.tagsContainer}>
        {/* Десктоп */}
        <div className={styles.desktop}>
          {tags?.map(tag => (
              <Tag key={tag.key} color="#1963aa" className={styles.filterTag}>
                {tag.label}
                <img
                    src="/category/filter-icon.svg"
                    alt="close"
                    width={16}
                    height={16}
                    className={styles.closeIcon}
                    onClick={tag.onClose}
                    style={{ cursor: 'pointer' }}
                />
              </Tag>
          ))}
        </div>

        {/* Мобилка */}
        <div className={styles.mobile}>
          {tags?.map(tag => (
              <Tag key={tag.key} color="#1963aa" className={styles.filterTag}>
                {tag.label}
                <img
                    src="/category/filter-icon.svg"
                    alt="close"
                    width={16}
                    height={16}
                    className={styles.closeIcon}
                    onClick={tag.onClose}
                    style={{ cursor: 'pointer' }}
                />
              </Tag>
          ))}
        </div>

        {tags?.length > 0 && (
            <Tag className={styles.filterClearTag} onClick={onClear}>
              Очистить фильтр
              <img
                  src="/category/filter-clear.svg"
                  alt="clear"
                  width={16}
                  height={16}
                  className={styles.closeIcon}
                  style={{ cursor: 'pointer' }}
              />
            </Tag>
        )}
      </div>
  );
}


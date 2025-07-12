'use client';

import React from 'react';
import { Breadcrumb } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type BreadcrumbsProps = {
  customNameMap?: Record<string, string>;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customNameMap = {} }) => {
  const pathname = usePathname();

  const pathSnippets = pathname
    .split('/')
    .filter(i => i)
    .map((_, index, arr) => '/' + arr.slice(0, index + 1).join('/'));

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link href="/">Главная</Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((url, index) => {
      const isLast = index === pathSnippets.length - 1;
      const name = customNameMap[url] || decodeURIComponent(url.split('/').pop() || '');
      return (
        <Breadcrumb.Item key={url}>
          {isLast ? (
            name
          ) : (
            <Link href={url}>{name}</Link>
          )}
        </Breadcrumb.Item>
      );
    }),
  ];

  return <Breadcrumb separator=" | ">{breadcrumbItems}</Breadcrumb>;
};

export default Breadcrumbs;

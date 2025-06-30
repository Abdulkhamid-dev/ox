import { useMemo } from 'react';
import type { IProduct } from '@/types/Product';

export const useProductSearch = (
  products: IProduct[],
  term: string
) => {
  return useMemo(() => {
    const search = term.toLowerCase();

    return products
      .filter((item) => {
        const name = item.productName?.toLowerCase() || '';
        const sku = item.sku?.toLowerCase() || '';
        const supplier = item.supplier?.toLowerCase() || '';
        const barcode = item.barcode?.toLowerCase() || '';
        return (
          name.includes(search) ||
          sku.includes(search) ||
          supplier.includes(search) ||
          barcode.includes(search)
        );
      })
      .sort((a, b) => {
        const aName = a.productName?.toLowerCase() || '';
        const bName = b.productName?.toLowerCase() || '';

        const aStarts = aName.startsWith(search);
        const bStarts = bName.startsWith(search);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return aName.localeCompare(bName);
      });
  }, [products, term]);
};

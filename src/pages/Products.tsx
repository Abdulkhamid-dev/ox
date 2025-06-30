import { PRODUCT_COLUMNS } from '@/constants';
import type { IProduct } from '@/types/Product';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import api from '@/utils/axios';

const PAGE_SIZE = 10;

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/variations', {
          params: { page, size: PAGE_SIZE },
        });
        setProducts(res.data.items);
        setTotal(res.data.total_count);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products list</h2>
      <Table
        rowKey="id"
        columns={PRODUCT_COLUMNS}
        dataSource={products}
        loading={loading}
        pagination={{
          current: page,
          total,
          pageSize: PAGE_SIZE,
          onChange: setPage,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default Products;

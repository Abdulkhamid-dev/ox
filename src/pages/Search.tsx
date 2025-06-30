import { Table } from 'antd';
import { useEffect, useState } from 'react';
import api from '@/utils/axios';
import type { IProduct } from '@/types/Product';
import { useProductSearch } from '@/hooks/useProductSearch';
import { PRODUCT_COLUMNS } from '@/constants';
import SearchInput from '@/components/SearchInput';

const SearchPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const filtered = useProductSearch(products, searchTerm);

  useEffect(() => {
    setLoading(true);
    api
      .get('/variations', { params: { page: 1, size: 500 } })
      .then((res) => setProducts(res.data.items))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Search</h2>
      <SearchInput onDebouncedChange={setSearchTerm} />
      <Table
        rowKey="id"
        columns={PRODUCT_COLUMNS}
        dataSource={filtered}
        loading={loading} // 🔹 Loading prop
        pagination={false}
        scroll={{ y: 'calc(100vh - 230px)' }}
      />
    </div>
  );
};

export default SearchPage;

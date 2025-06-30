import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchInputProps {
  delay?: number;
  placeholder?: string;
  onDebouncedChange: (value: string) => void;
}

const SearchInput = ({
  delay = 300,
  placeholder = 'Search...',
  onDebouncedChange,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const debounced = useDebounce(inputValue, delay);

  useEffect(() => {
    onDebouncedChange(debounced);
  }, [debounced, onDebouncedChange]);

  return (
    <Input
      allowClear
      value={inputValue}
      placeholder={placeholder}
      onChange={(e) => setInputValue(e.target.value)}
      style={{ marginBottom: 20, maxWidth: 300 }}
    />
  );
};

export default SearchInput;

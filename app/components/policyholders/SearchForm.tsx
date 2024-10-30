'use client';

import { type FC } from 'react';

import useSearchForm from '@/app/hooks/policyholders/useSearchForm';
import { type SearchFormProps } from '@/app/lib/policyholders/type';

const SearchForm: FC<SearchFormProps> = ({ value: initialValue, onSearch }) => {
  const { value, handleChange, handleSubmit } = useSearchForm({
    value: initialValue,
    onSearch,
  });

  return (
    <form
      className="p-4 border border-zinc-400 rounded flex items-center gap-4"
      onSubmit={handleSubmit}
    >
      <span>保戶編號</span>
      <input
        className="border rounded flex-grow"
        placeholder="測試編號：0000000001"
        value={value}
        onChange={handleChange}
      />
      <button
        className="px-4 py-2 rounded bg-amber-300 hover:bg-amber-500"
        type="submit"
      >
        查詢
      </button>
    </form>
  );
};

export default SearchForm;

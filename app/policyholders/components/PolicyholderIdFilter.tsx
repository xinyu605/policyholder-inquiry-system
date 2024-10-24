'use client';

import { ChangeEvent, FormEvent, useState, type FC } from 'react';

interface PolicyholderIdFilterProps {
  onSearch: (keyword: string) => void;
}

const PolicyholderIdFilter: FC<PolicyholderIdFilterProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(keyword);
  };

  return (
    <form
      className="p-4 border border-zinc-400 rounded flex items-center gap-4"
      onSubmit={handleSubmit}
    >
      <span>保戶編號</span>
      <input
        className="border rounded"
        value={keyword}
        onChange={handleChangeKeyword}
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

export default PolicyholderIdFilter;

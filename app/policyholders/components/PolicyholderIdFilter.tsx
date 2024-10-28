'use client';

import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useEffect,
  useState,
} from 'react';

interface PolicyholderIdFilterProps {
  keyword?: string;
  onSearch: (keyword: string) => void;
}

const PolicyholderIdFilter: FC<PolicyholderIdFilterProps> = ({
  keyword: initKeyword,
  onSearch,
}) => {
  const [keyword, setKeyword] = useState(initKeyword || '');

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(keyword);
  };

  useEffect(() => {
    if (!initKeyword) return;
    setKeyword(initKeyword);
  }, [initKeyword]);

  return (
    <form
      className="p-4 border border-zinc-400 rounded flex items-center gap-4"
      onSubmit={handleSubmit}
    >
      <span>保戶編號</span>
      <input
        className="border rounded flex-grow"
        placeholder="測試編號：0000000001"
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

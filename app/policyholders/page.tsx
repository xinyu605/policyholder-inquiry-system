'use client';

import { useCallback, useState, type FC } from 'react';

import PolicyholderIdFilter from '@/app/policyholders/components/PolicyholderIdFilter';

const Policyholders: FC = () => {
  const [, setKeyword] = useState('');

  const handleSearchClient = useCallback((newKeyword: string) => {
    setKeyword(newKeyword);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <PolicyholderIdFilter onSearch={handleSearchClient} />
      <h2 className="pt-2 text-2xl">關係圖</h2>
      <div>{/* TODO: add policyholder organization modules  */}</div>
    </div>
  );
};

export default Policyholders;

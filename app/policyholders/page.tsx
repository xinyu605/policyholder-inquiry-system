'use client';

import { useCallback, useState, type FC } from 'react';

import { useGetPolicyholders } from '@/app/api/route';

import PolicyholderIdFilter from '@/app/policyholders/components/PolicyholderIdFilter';

const Policyholders: FC = () => {
  const [code, setCode] = useState('');

  useGetPolicyholders({ code }, { enabled: !!code });

  const handleSearchClient = useCallback((newKeyword: string) => {
    setCode(newKeyword);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <PolicyholderIdFilter onSearch={handleSearchClient} />
      <span>test code: 3480b264-961e-4eb0-b682-1c0c404a1d0b</span>
      <h2 className="pt-2 text-2xl">關係圖</h2>
      <div>{/* TODO: add policyholder organization modules  */}</div>
    </div>
  );
};

export default Policyholders;

'use client';

import { useCallback, useState, type FC } from 'react';

import { useGetPolicyholders } from '@/app/api/route';
import {
  buildTree,
  getMaxNodes,
  MAX_SUBTREE_LEVEL,
} from '@/app/policyholders/lib/utils';

import PolicyholderIdFilter from '@/app/policyholders/components/PolicyholderIdFilter';
import PolicyholderTree from '@/app/policyholders/components/PolicyholderTree';

const Policyholders: FC = () => {
  const [code, setCode] = useState('');

  const { data: policyholdersData } = useGetPolicyholders(
    { code },
    { enabled: !!code }
  );

  const policyholderRoot = (() => {
    if (!policyholdersData) return null;

    const maxIdx = getMaxNodes(MAX_SUBTREE_LEVEL);

    const limitedPolicyholders = {
      ...policyholdersData,
      l: policyholdersData.l.slice(0, maxIdx),
      r: policyholdersData.r.slice(0, maxIdx),
    };

    return buildTree(limitedPolicyholders);
  })();

  const handleSearchClient = useCallback((newKeyword: string) => {
    setCode(newKeyword);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <PolicyholderIdFilter keyword={code} onSearch={handleSearchClient} />
      <h2 className="pt-2 text-2xl">關係圖</h2>
      {policyholderRoot && (
        <PolicyholderTree
          root={policyholderRoot}
          onClick={handleSearchClient}
        />
      )}
    </div>
  );
};

export default Policyholders;

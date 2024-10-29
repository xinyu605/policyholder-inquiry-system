'use client';

import { type FC } from 'react';

import usePolicyholders from '@/app/policyholders/hooks/usePolicyholders';

import PolicyholderIdFilter from '@/app/policyholders/components/PolicyholderIdFilter';
import PolicyholderTree from '@/app/policyholders/components/PolicyholderTree';

const Policyholders: FC = () => {
  const { error, policyholderTree, handleSearchSubtree, handleSearchTree } =
    usePolicyholders();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <PolicyholderIdFilter
        keyword={policyholderTree?.code}
        onSearch={handleSearchTree('self')}
      />
      <h2 className="pt-2 text-2xl">關係圖</h2>
      {error && <span>Error: {error.message}</span>}
      {policyholderTree && (
        <PolicyholderTree
          root={policyholderTree}
          onClick={handleSearchSubtree}
          onClickTop={handleSearchTree('top')}
        />
      )}
    </div>
  );
};

export default Policyholders;

'use client';

import { type FC } from 'react';

import usePolicyholders from '@/app/policyholders/hooks/usePolicyholders';

import SearchForm from '@/app/policyholders/components/Policyholder.SearchForm';
import Tree from '@/app/policyholders/components/Policyholder.Tree';

const Policyholders: FC = () => {
  const { error, root, handleSearchSubtree, handleSearchTree } =
    usePolicyholders();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <SearchForm value={root?.code} onSearch={handleSearchTree('self')} />
      <h2 className="pt-2 text-2xl">關係圖</h2>
      {error && <span>Error: {error.message}</span>}
      {root && (
        <Tree
          root={root}
          onClickCode={handleSearchSubtree}
          onClickTop={handleSearchTree('top')}
        />
      )}
    </div>
  );
};

export default Policyholders;

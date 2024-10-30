'use client';

import { type FC } from 'react';

import { SearchTarget } from '@/app/lib/policyholders/type';
import usePolicyholders from '@/app/hooks/policyholders/usePolicyholders';

import SearchForm from '@/app/components/policyholders/SearchForm';
import Tree from '@/app/components/policyholders/Tree';

const Policyholders: FC = () => {
  const { error, root, handleSearchSubtree, handleSearchTree } =
    usePolicyholders();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <SearchForm
        value={root?.code}
        onSearch={handleSearchTree(SearchTarget.SELF)}
      />
      <h2 className="pt-2 text-2xl">關係圖</h2>
      {error && <span>Error: {error.message}</span>}
      {root && (
        <Tree
          root={root}
          onClickCode={handleSearchSubtree}
          onClickTop={handleSearchTree(SearchTarget.UPPER)}
        />
      )}
    </div>
  );
};

export default Policyholders;

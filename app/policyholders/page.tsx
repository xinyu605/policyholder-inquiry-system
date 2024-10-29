'use client';

import { useCallback, useState, type FC } from 'react';

import {
  PolicyholderTreeNode,
  useGetPolicyholders,
  useGetTopPolicyholders,
} from '@/app/api/route';

import PolicyholderIdFilter from '@/app/policyholders/components/PolicyholderIdFilter';
import PolicyholderTree from '@/app/policyholders/components/PolicyholderTree';
import { findSubtree } from '@/app/policyholders/lib/utils';

const usePolicyHoldersData = (code: string, target: 'self' | 'top') => {
  const policyholdersRes = useGetPolicyholders(
    { code },
    { enabled: target === 'self' && !!code }
  );

  const topPolicyholdersRes = useGetTopPolicyholders(
    { code },
    { enabled: target === 'top' && !!code }
  );

  return target === 'self' ? policyholdersRes : topPolicyholdersRes;
};

const Policyholders: FC = () => {
  const [policyholderCode, setPolicyholderCode] = useState<{
    target: 'top' | 'self';
    code: string;
  }>({ code: '', target: 'self' });

  const { data: policyholdersData, error } = usePolicyHoldersData(
    policyholderCode.code,
    policyholderCode.target
  );

  const [subtree, setSubtree] = useState<PolicyholderTreeNode | undefined>();

  const handleSearchTree = (target: 'self' | 'top') => (newCode: string) => {
    setSubtree(undefined);
    setPolicyholderCode({ code: newCode, target: target });
  };

  const handleSearchSubtree = useCallback(
    (subCode: string) => {
      setSubtree(() => {
        return findSubtree(policyholdersData, subCode);
      });
    },
    [policyholdersData]
  );

  const tree = subtree || policyholdersData;

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <PolicyholderIdFilter
        keyword={tree?.code}
        onSearch={handleSearchTree('self')}
      />
      <h2 className="pt-2 text-2xl">關係圖</h2>
      {error && <span>Error: {error.message}</span>}
      {tree && (
        <PolicyholderTree
          root={tree}
          onClick={handleSearchSubtree}
          onClickTop={handleSearchTree('top')}
        />
      )}
    </div>
  );
};

export default Policyholders;

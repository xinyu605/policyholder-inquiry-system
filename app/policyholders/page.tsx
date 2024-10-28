'use client';

import { useCallback, useMemo, useState, type FC } from 'react';

import {
  PolicyholderTreeNode,
  useGetPolicyholders,
  useGetTopPolicyholders,
} from '@/app/api/route';

import PolicyholderIdFilter from '@/app/policyholders/components/PolicyholderIdFilter';
import PolicyholderTree from '@/app/policyholders/components/PolicyholderTree';
import { findSubTree } from '@/app/policyholders/lib/utils';

const usePolicyHoldersData = (code: string, target: 'self' | 'top') => {
  const { data: policyholdersData } = useGetPolicyholders(
    { code },
    { enabled: target === 'self' && !!code }
  );

  const { data: topPolicyholdersData } = useGetTopPolicyholders(
    { code },
    { enabled: target === 'top' && !!code }
  );

  return useMemo(
    () => (target === 'self' ? policyholdersData : topPolicyholdersData),
    [policyholdersData, target, topPolicyholdersData]
  );
};

const Policyholders: FC = () => {
  const [policyholderCode, setPolicyholderCode] = useState<{
    target: 'top' | 'self';
    code: string;
  }>({ code: '', target: 'self' });

  const policyholdersData = usePolicyHoldersData(
    policyholderCode.code,
    policyholderCode.target
  );

  const [subTree, setSubTree] = useState<PolicyholderTreeNode | undefined>();

  const handleSearchClient = useCallback((newKeyword: string) => {
    setSubTree(undefined);
    setPolicyholderCode({ code: newKeyword, target: 'self' });
  }, []);

  const handleClickTop = useCallback((newCode: string) => {
    setSubTree(undefined);
    setPolicyholderCode(() => ({ code: newCode, target: 'top' }));
  }, []);

  const handleSearchSubTree = useCallback(
    (subCode: string) => {
      setSubTree(() => {
        return findSubTree(policyholdersData, subCode);
      });
    },
    [policyholdersData]
  );

  const tree = subTree || policyholdersData;

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <PolicyholderIdFilter
        keyword={tree?.code}
        onSearch={handleSearchClient}
      />
      <h2 className="pt-2 text-2xl">關係圖</h2>
      {tree && (
        <PolicyholderTree
          root={tree}
          onClick={handleSearchSubTree}
          onClickTop={handleClickTop}
        />
      )}
    </div>
  );
};

export default Policyholders;

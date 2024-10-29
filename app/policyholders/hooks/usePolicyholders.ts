import { useCallback, useState } from 'react';

import {
  useGetPolicyholders,
  useGetTopPolicyholders,
} from '@/app/policyholders/api/route';
import { findSubtree } from '@/app/policyholders/lib/utils';
import {
  type PolicyholderTreeNode,
  type SearchParams,
} from '@/app/policyholders/lib/type';

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

interface UsePolicyholdersRes {
  error: Error | null;
  root: PolicyholderTreeNode | undefined;
  handleSearchSubtree: (subCode: string) => void;
  handleSearchTree: (target: 'self' | 'top') => (newCode: string) => void;
}

const usePolicyholders = (): UsePolicyholdersRes => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    code: '',
    target: 'self',
  });
  const [subtree, setSubtree] = useState<PolicyholderTreeNode>();

  const { data: policyholdersData, error } = usePolicyHoldersData(
    searchParams.code,
    searchParams.target
  );

  const handleSearchTree = (target: 'self' | 'top') => (newCode: string) => {
    setSubtree(undefined);
    setSearchParams({ code: newCode, target: target });
  };

  const handleSearchSubtree = useCallback(
    (subCode: string) => {
      setSubtree(() => {
        return findSubtree(policyholdersData, subCode);
      });
    },
    [policyholdersData]
  );

  const root = subtree || policyholdersData;

  return {
    error,
    root,
    handleSearchSubtree,
    handleSearchTree,
  };
};

export default usePolicyholders;

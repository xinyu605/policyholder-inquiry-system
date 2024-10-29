import { useCallback, useState } from 'react';

import {
  useGetPolicyholders,
  useGetTopPolicyholders,
  type PolicyholderTreeNode,
} from '@/app/api/route';
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

interface SearchParams {
  target: 'top' | 'self';
  code: string;
}

interface PolicyholdersRes {
  error: Error | null;
  policyholderTree: PolicyholderTreeNode | undefined;
  handleSearchSubtree: (subCode: string) => void;
  handleSearchTree: (target: 'self' | 'top') => (newCode: string) => void;
}

const usePolicyholders = (): PolicyholdersRes => {
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

  const policyholderTree = subtree || policyholdersData;

  return {
    error,
    policyholderTree,
    handleSearchSubtree,
    handleSearchTree,
  };
};

export default usePolicyholders;

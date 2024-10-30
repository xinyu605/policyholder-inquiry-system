import { useCallback, useState } from 'react';

import {
  useGetPolicyholders,
  useGetTopPolicyholders,
} from '@/app/api/policyholders';
import { findSubtree } from '@/app/lib/policyholders/utils';
import {
  SearchTarget,
  type PolicyholderTreeNode,
  type SearchParams,
} from '@/app/lib/policyholders/type';

const usePolicyHoldersData = (code: string, target: SearchTarget) => {
  const policyholdersRes = useGetPolicyholders(
    { code },
    { enabled: target === SearchTarget.SELF && !!code }
  );

  const topPolicyholdersRes = useGetTopPolicyholders(
    { code },
    { enabled: target === SearchTarget.UPPER && !!code }
  );

  return target === SearchTarget.SELF ? policyholdersRes : topPolicyholdersRes;
};

interface UsePolicyholdersRes {
  error: Error | null;
  root: PolicyholderTreeNode | undefined;
  handleSearchSubtree: (subCode: string) => void;
  handleSearchTree: (target: SearchTarget) => (newCode: string) => void;
}

const usePolicyholders = (): UsePolicyholdersRes => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    code: '',
    target: SearchTarget.SELF,
  });
  const [subtree, setSubtree] = useState<PolicyholderTreeNode>();

  const { data: policyholdersData, error } = usePolicyHoldersData(
    searchParams.code,
    searchParams.target
  );

  const handleSearchTree = (target: SearchTarget) => (newCode: string) => {
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

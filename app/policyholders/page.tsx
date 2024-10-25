'use client';

import { useCallback, useState, type FC } from 'react';

import {
  type Policyholder,
  type PolicyholderInfo,
  useGetPolicyholders,
} from '@/app/api/route';

import PolicyholderIdFilter from '@/app/policyholders/components/PolicyholderIdFilter';
import PolicyholderTree, {
  type TreeNodeType,
} from './components/PolicyholderTree';

const buildTree = (policyholder: Policyholder): TreeNodeType => {
  const { code, introducer_code, name, registration_date, l, r } = policyholder;

  const tree: TreeNodeType = {
    code,
    introducer_code,
    name,
    registration_date,
  };

  const getNextTreeNode = (nodes: PolicyholderInfo[]) => {
    if (nodes.length === 0) return;
    const currentInfo = nodes[0];
    const remainingPolicyholders = nodes.toSpliced(0, 1);
    const half = Math.ceil(remainingPolicyholders.length / 2);
    const firstHalf = remainingPolicyholders.splice(0, half);
    return { ...currentInfo, l: firstHalf, r: remainingPolicyholders };
  };

  const nextLeftTreeNode = getNextTreeNode(l);
  const nextRightTreeNode = getNextTreeNode(r);

  if (nextLeftTreeNode) {
    tree.left = buildTree(nextLeftTreeNode);
  }

  if (nextRightTreeNode) {
    tree.right = buildTree(nextRightTreeNode);
  }

  return tree;
};

const Policyholders: FC = () => {
  const [code, setCode] = useState('');

  const { data: policyholdersData } = useGetPolicyholders(
    { code },
    { enabled: !!code }
  );

  const policyholderRoot = policyholdersData
    ? buildTree(policyholdersData)
    : null;

  const handleSearchClient = useCallback((newKeyword: string) => {
    setCode(newKeyword);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <PolicyholderIdFilter onSearch={handleSearchClient} />
      <span>test code: 43bda7c2-bb84-4ace-9704-efcef436065b</span>
      <h2 className="pt-2 text-2xl">關係圖</h2>
      {policyholderRoot && <PolicyholderTree root={policyholderRoot} />}
    </div>
  );
};

export default Policyholders;

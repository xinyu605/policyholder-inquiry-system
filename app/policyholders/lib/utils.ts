import { type PolicyholderInfo, type Policyholder } from '@/app/api/route';
import { type TreeNodeType } from '@/app/policyholders/components/PolicyholderTree';

export const MAX_SUBTREE_LEVEL = 3;

export const getMaxNodes = (level: number) => {
  let count = 0;
  for (let i = 0; i < level; i++) {
    count += 2 ** i;
  }
  return count;
};

export const buildTree = (policyholder: Policyholder): TreeNodeType => {
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

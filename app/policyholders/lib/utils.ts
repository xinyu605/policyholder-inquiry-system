import {
  type PolicyholderInfo,
  type PolicyholderTreeNode,
} from '@/app/api/route';

export const MAX_SUBTREE_LEVEL = 3;

export const buildTree = (
  policyholder: PolicyholderInfo,
  level = 0
): PolicyholderTreeNode => {
  const { left, right, ...rest } = policyholder;
  return {
    ...rest,
    level: level,
    left: left && left.length > 0 ? buildTree(left[0], level + 1) : undefined,
    right:
      right && right.length > 0 ? buildTree(right[0], level + 1) : undefined,
  };
};

export const findSubTree = (
  tree: PolicyholderTreeNode | undefined,
  code: string
): PolicyholderTreeNode | undefined => {
  if (!tree) return undefined;
  if (tree?.code === code) return tree;

  const leftTree = findSubTree(tree?.left, code);
  if (leftTree) return leftTree;

  const rightTree = findSubTree(tree?.right, code);
  return rightTree;
};

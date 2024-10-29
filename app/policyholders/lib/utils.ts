import {
  type PolicyholderInfo,
  type PolicyholderTreeNode,
} from '@/app/api/route';

export const MAX_SUBTREE_LEVEL = 3;

export const buildTree = (
  policyholder: PolicyholderInfo,
  level = 0
): PolicyholderTreeNode => {
  const { introducer_code, left, right, ...rest } = policyholder;
  const getSubtree = (nodes?: PolicyholderInfo[]) =>
    nodes && nodes.length > 0 ? buildTree(nodes[0], level + 1) : undefined;

  return {
    ...rest,
    introducerCode: introducer_code,
    level: level,
    left: getSubtree(left),
    right: getSubtree(right),
  };
};

export const findSubtree = (
  tree: PolicyholderTreeNode | undefined,
  code: string
): PolicyholderTreeNode | undefined => {
  if (!tree) return undefined;
  if (tree?.code === code) return tree;

  const leftTree = findSubtree(tree?.left, code);
  if (leftTree) return leftTree;

  const rightTree = findSubtree(tree?.right, code);
  return rightTree;
};

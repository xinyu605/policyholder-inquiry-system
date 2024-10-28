import {
  type PolicyholderInfo,
  type PolicyholderTreeNode,
} from '@/app/api/route';

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

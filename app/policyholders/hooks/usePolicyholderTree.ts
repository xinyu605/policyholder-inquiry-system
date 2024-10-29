import { type PolicyholderTreeNode } from '@/app/api/route';
import { MAX_SUBTREE_LEVEL } from '@/app/policyholders/lib/utils';

interface PolicyholderTreePayload {
  node: Pick<
    PolicyholderTreeNode,
    'code' | 'introducerCode' | 'left' | 'level' | 'right'
  >;
  root: Pick<PolicyholderTreeNode, 'code' | 'level'>;
  onClickCode: (code: string) => void;
  onClickTop?: (code: string) => void;
}

interface PolicyholderTreeRes {
  isChild: boolean;
  isRoot: boolean;
  showSubtree: boolean;
  handleClickCode: () => void;
  /** It would be `undefined` when the node is not the root or its `introducerCode` is `null`. */
  handleClickTop?: () => void;
}

const usePolicyholderTree = ({
  node: { code, introducerCode, left, level, right },
  root,
  onClickCode,
  onClickTop,
}: PolicyholderTreePayload): PolicyholderTreeRes => {
  const isChild = root.code === introducerCode;
  const isRoot = root.code === code;
  const isValidLevel = level - root.level < MAX_SUBTREE_LEVEL;
  const showSubtree = isValidLevel && !!(left || right);

  const handleClickCode = () => {
    if (isRoot) return;
    onClickCode(code);
  };

  const handleClickTop =
    isRoot && introducerCode
      ? () => {
          onClickTop?.(introducerCode);
        }
      : undefined;

  return {
    isChild,
    isRoot,
    showSubtree,
    handleClickCode,
    handleClickTop,
  };
};

export default usePolicyholderTree;

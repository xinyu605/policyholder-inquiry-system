import { MAX_SUBTREE_LEVEL } from '@/app/lib/policyholders/utils';
import { type UseTreeNodeProps } from '@/app/lib/policyholders/type';

interface UseTreeNodeRes {
  isChild: boolean;
  isRoot: boolean;
  showSubtree: boolean;
  handleClickCode: () => void;
  /** It would be `undefined` when the node is not the root or its `introducerCode` is `null`. */
  handleClickTop?: () => void;
}

const useTreeNode = ({
  node: { code, introducerCode, left, level, right },
  root,
  onClickCode,
  onClickTop,
}: UseTreeNodeProps): UseTreeNodeRes => {
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

export default useTreeNode;

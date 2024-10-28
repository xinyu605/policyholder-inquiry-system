import { type FC } from 'react';
import clsx from 'clsx';

import { type PolicyholderTreeNode } from '@/app/api/route';

interface TreeNodeProps {
  rootCode: string;
  node: PolicyholderTreeNode;
  onClick: (code: string) => void;
  onClickTop?: (code: string) => void;
}

const TreeNode: FC<TreeNodeProps> = ({
  rootCode,
  node: { code, introducer_code, name, left, right },
  onClick,
  onClickTop,
}) => {
  const isRoot = rootCode === code;
  const isChild = rootCode === introducer_code;

  const handleClickCode = () => {
    onClick(code);
  };

  const handleClickTop = () => {
    onClickTop?.(rootCode);
  };

  return (
    <div className="flex flex-col items-center mx-3">
      <div className="flex items-center gap-2">
        <div
          className={clsx(
            'flex flex-col items-center gap-1',
            'w-52 border border-gray-400 rounded-lg p-2',
            { 'bg-yellow-200': isRoot, 'bg-sky-100': isChild }
          )}
        >
          <button
            className={clsx(
              'font-bold text-center text-blue-700',
              'px-1 rounded',
              'hover:bg-blue-300'
            )}
            onClick={handleClickCode}
          >
            {code}
          </button>
          <p>{name}</p>
        </div>
        {isRoot && (
          <button
            className={clsx(
              'p-2 bg-slate-100 rounded text-center',
              'hover:bg-slate-200'
            )}
            onClick={handleClickTop}
          >
            上一階
          </button>
        )}
      </div>
      {(left || right) && (
        <div
          className={clsx(
            'flex justify-center mt-4 relative',
            'before:absolute before:-top-4 before:left-1/2',
            'before:block before:w-px before:h-4 before:bg-gray-400'
          )}
        >
          {left && (
            <div>
              {right && (
                <div
                  className={clsx(
                    'border-t border-l border-gray-400',
                    'h-8 w-1/2 ml-auto'
                  )}
                />
              )}
              <TreeNode rootCode={rootCode} node={left} onClick={onClick} />
            </div>
          )}
          {right && (
            <div>
              <div
                className={clsx(
                  'border-t border-r border-gray-400',
                  'h-8 w-1/2 mr-auto'
                )}
              />
              <TreeNode rootCode={rootCode} node={right} onClick={onClick} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface PolicyholderTreeProps
  extends Pick<TreeNodeProps, 'onClick' | 'onClickTop'> {
  root: PolicyholderTreeNode;
}

const PolicyholderTree: FC<PolicyholderTreeProps> = ({
  root,
  onClick,
  onClickTop,
}) => {
  return (
    <div className="flex p-4 overflow-auto">
      <TreeNode
        node={root}
        rootCode={root.code}
        onClick={onClick}
        onClickTop={onClickTop}
      />
    </div>
  );
};

export default PolicyholderTree;

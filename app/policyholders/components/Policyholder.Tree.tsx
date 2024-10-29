import { type FC } from 'react';
import clsx from 'clsx';

import useTreeNode from '@/app/policyholders/hooks/useTreeNode';
import {
  type TreeNodeProps,
  type TreeProps,
} from '@/app/policyholders/lib/type';

const TreeNode: FC<TreeNodeProps> = ({
  root,
  node,
  onClickCode,
  onClickTop,
}) => {
  const { code, name, left, right } = node;
  const { isChild, isRoot, showSubtree, handleClickCode, handleClickTop } =
    useTreeNode({
      node,
      root,
      onClickCode,
      onClickTop,
    });

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
        {handleClickTop && (
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
      {showSubtree && (
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
              <TreeNode root={root} node={left} onClickCode={onClickCode} />
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
              <TreeNode root={root} node={right} onClickCode={onClickCode} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Tree: FC<TreeProps> = ({ root, onClickCode, onClickTop }) => {
  return (
    <div className="flex p-4 overflow-auto">
      <TreeNode
        node={root}
        root={root}
        onClickCode={onClickCode}
        onClickTop={onClickTop}
      />
    </div>
  );
};

export default Tree;

import { type FC } from 'react';
import clsx from 'clsx';

import { type Policyholder } from '@/app/api/route';

export interface TreeNodeType extends Omit<Policyholder, 'l' | 'r'> {
  left?: TreeNodeType;
  right?: TreeNodeType;
}

interface TreeNodeProps {
  rootCode: string;
  node: TreeNodeType;
}

const TreeNode: FC<TreeNodeProps> = ({
  rootCode,
  node: { code, introducer_code, name, left, right },
}) => {
  const isRoot = rootCode === code;
  const isChild = rootCode === introducer_code;

  return (
    <div className="flex flex-col items-center mx-3">
      <div
        className={clsx(
          'flex flex-col items-center',
          'w-52 border border-gray-400 rounded-lg p-2',
          { 'bg-yellow-200': isRoot, 'bg-sky-100': isChild }
        )}
      >
        <p className="font-bold text-center">{code}</p>
        <p>{name}</p>
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
              <TreeNode rootCode={rootCode} node={left} />
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
              <TreeNode rootCode={rootCode} node={right} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface PolicyholderTreeProps {
  root: TreeNodeType;
}

const PolicyholderTree: FC<PolicyholderTreeProps> = ({ root }) => {
  return (
    <div className="flex p-4 overflow-auto">
      <TreeNode node={root} rootCode={root.code} />
    </div>
  );
};

export default PolicyholderTree;
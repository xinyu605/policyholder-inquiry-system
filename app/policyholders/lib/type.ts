/** API Response */
export interface PolicyholderInfo {
  code: string;
  introducer_code: string | null;
  left?: PolicyholderInfo[];
  name: string;
  /** date string, e.g. 2022-10-23 */
  registration_date: string;
  right?: PolicyholderInfo[];
}

export interface PolicyholderTreeNode
  extends Omit<PolicyholderInfo, 'introducer_code' | 'left' | 'right'> {
  introducerCode: string | null;
  left?: PolicyholderTreeNode;
  level: number;
  right?: PolicyholderTreeNode;
}

/** Components and Custom hooks */

export interface SearchFormProps {
  value?: string;
  onSearch: (keyword: string) => void;
}

export interface SearchParams {
  target: 'top' | 'self';
  code: string;
}

export interface TreeNodeProps {
  node: PolicyholderTreeNode;
  root: Pick<PolicyholderTreeNode, 'code' | 'level'>;
  onClickCode: (code: string) => void;
  onClickTop?: (code: string) => void;
}

export interface UseTreeNodeProps
  extends Pick<TreeNodeProps, 'root' | 'onClickCode' | 'onClickTop'> {
  node: Pick<
    PolicyholderTreeNode,
    'code' | 'introducerCode' | 'left' | 'level' | 'right'
  >;
}

export interface TreeProps
  extends Pick<TreeNodeProps, 'onClickCode' | 'onClickTop'> {
  root: PolicyholderTreeNode;
}

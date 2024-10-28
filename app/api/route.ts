import { useQuery } from '@tanstack/react-query';

import { Route } from '@/app/lib/routes';
import request, { type QueryOptions } from '@/app/api/request';
import { buildTree } from '@/app/policyholders/lib/utils';

interface GetPolicyholdersPayload {
  code: string;
}

export interface PolicyholderInfo {
  code: string;
  introducer_code: string | null;
  name: string;
  /** date string eg. 2022-10-23 */
  registration_date: string;
  left?: PolicyholderInfo[];
  right?: PolicyholderInfo[];
}

export interface PolicyholderTreeNode
  extends Omit<PolicyholderInfo, 'left' | 'right'> {
  left?: PolicyholderTreeNode;
  level: number;
  right?: PolicyholderTreeNode;
}

export const useGetPolicyholders = (
  { code }: GetPolicyholdersPayload,
  options?: QueryOptions<PolicyholderTreeNode>
) => {
  return useQuery({
    ...options,
    queryKey: ['policyholders', code],
    queryFn: async () => {
      const {
        data: { policyholder },
      } = await request.get<{ policyholder: PolicyholderInfo }>(
        `${Route.POLICYHOLDERS}?code=${code}`
      );
      return buildTree(policyholder);
    },
  });
};

type GetTopPolicyholdersPayload = GetPolicyholdersPayload;

export const useGetTopPolicyholders = (
  { code }: GetTopPolicyholdersPayload,
  options?: QueryOptions<PolicyholderTreeNode>
) => {
  return useQuery({
    ...options,
    queryKey: ['topPolicyholders', code],
    queryFn: async () => {
      const {
        data: { policyholder },
      } = await request.get<{ policyholder: PolicyholderInfo }>(
        `${Route.POLICYHOLDERS}/${code}/top`
      );
      return buildTree(policyholder);
    },
  });
};

import { useQuery } from '@tanstack/react-query';

import { Route } from '@/app/lib/routes';
import request, { type QueryOptions } from '@/app/api/request';
import { buildTree } from '@/app/lib/policyholders/utils';
import {
  type PolicyholderInfo,
  type PolicyholderTreeNode,
} from '@/app/lib/policyholders/type';

interface GetPolicyholdersPayload {
  code: string;
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

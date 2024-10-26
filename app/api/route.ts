import { useQuery } from '@tanstack/react-query';

import { Route } from '@/app/lib/routes';
import request, { type QueryOptions } from '@/app/api/request';

interface GetPolicyholdersPayload {
  code: string;
}

export interface PolicyholderInfo {
  code: string;
  introducer_code: string;
  name: string;
  registration_date: Date;
}

export interface Policyholder extends PolicyholderInfo {
  l: PolicyholderInfo[];
  r: PolicyholderInfo[];
}

export const useGetPolicyholders = (
  { code }: GetPolicyholdersPayload,
  options?: QueryOptions<Policyholder>
) => {
  return useQuery({
    ...options,
    queryKey: ['policyholders', code],
    queryFn: async () => {
      const res = await request.get<Policyholder>(
        `${Route.POLICYHOLDERS}?code=${code}`
      );
      return res.data;
    },
  });
};

type GetTopPolicyholdersPayload = GetPolicyholdersPayload;

export const useGetTopPolicyholders = (
  { code }: GetTopPolicyholdersPayload,
  options?: QueryOptions<Policyholder>
) => {
  return useQuery({
    ...options,
    queryKey: ['topPolicyholders', code],
    queryFn: async () => {
      const res = await request.get<Policyholder>(
        `${Route.POLICYHOLDERS}/${code}/top`
      );
      return res.data;
    },
  });
};

'use client';

import { useCallback, useMemo, useState, type FC } from 'react';

import { useGetPolicyholders, useGetTopPolicyholders } from '@/app/api/route';
import { getPolicyholdersRoot } from '@/app/policyholders/lib/utils';

import PolicyholderIdFilter from '@/app/policyholders/components/PolicyholderIdFilter';
import PolicyholderTree from '@/app/policyholders/components/PolicyholderTree';

const Policyholders: FC = () => {
  const [policyholderCode, setPolicyholderCode] = useState<{
    target: 'top' | 'self';
    code: string;
  }>({ code: '', target: 'self' });

  const { data: policyholdersData } = useGetPolicyholders(
    { code: policyholderCode.code },
    { enabled: policyholderCode.target === 'self' && !!policyholderCode.code }
  );

  const { data: topPolicyholdersData } = useGetTopPolicyholders(
    { code: policyholderCode.code },
    { enabled: policyholderCode.target === 'top' && !!policyholderCode.code }
  );

  const policyholderRoot = useMemo(() => {
    if (topPolicyholdersData) {
      return getPolicyholdersRoot(topPolicyholdersData);
    }
    if (policyholdersData) {
      return getPolicyholdersRoot(policyholdersData);
    }
    return null;
  }, [policyholdersData, topPolicyholdersData]);

  const handleSearchClient = useCallback((newKeyword: string) => {
    setPolicyholderCode({ code: newKeyword, target: 'self' });
  }, []);

  const handleClickTop = useCallback((newCode: string) => {
    setPolicyholderCode({ code: newCode, target: 'top' });
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="pb-2 text-2xl">保戶關係查詢</h2>
      <PolicyholderIdFilter
        keyword={policyholderCode.code}
        onSearch={handleSearchClient}
      />
      <h2 className="pt-2 text-2xl">關係圖</h2>
      {policyholderRoot && (
        <PolicyholderTree
          root={policyholderRoot}
          onClick={handleSearchClient}
          onClickTop={handleClickTop}
        />
      )}
    </div>
  );
};

export default Policyholders;

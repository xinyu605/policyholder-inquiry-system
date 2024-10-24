import { type Metadata } from 'next';
import { type FC, type ReactNode } from 'react';

import '@/app/globals.css';

import ReactQueryClientProvider from '@/app/components/ReactQueryClientProvider';

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export const metadata: Metadata = {
  title: 'Policyholder Inquiry System',
  description:
    'The referral relationships of policyholders are presented in the structure of a binary tree.',
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <ReactQueryClientProvider>
    <html lang="en">
      <body>{children}</body>
    </html>
  </ReactQueryClientProvider>
);

export default RootLayout;

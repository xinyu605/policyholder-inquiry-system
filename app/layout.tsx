import { type Metadata } from 'next';
import { type FC, type ReactNode } from 'react';

import '@/app/globals.css';

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export const metadata: Metadata = {
  title: 'Policyholder Inquiry System',
  description:
    'The referral relationships of policyholders are presented in the structure of a binary tree.',
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;

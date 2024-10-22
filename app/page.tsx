import { type FC } from 'react';

import Link from 'next/link';

const Home: FC = () => {
  return (
    <div className="flex flex-col gap-6 h-screen">
      <main className="flex-grow flex justify-center items-center">
        <Link
          href="/policyholders"
          className="p-3 border border-sky-700 rounded-md hover:bg-sky-100"
        >
          Policyholder Inquiry System
        </Link>
      </main>
      <footer className="m-auto">
        <p className="text-slate-600">
          Copyright © 2024 Ruby Yan. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;

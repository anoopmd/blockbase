import React from "react";
import Link from 'next/link';
import { IconBox } from '@tabler/icons';

const Navbar = () => {
  return (
    <div className="w-full site-navbar">
      <header className="flex items-center justify-between py-4">
        <div>
          <Link href="/">
            <div className="flex items-center cursor-pointer font-bold text-lg">
              <IconBox />
              <span className="ml-2">blockbase</span>
            </div>
          </Link>
        </div>
        <nav className='flex flex-grow justify-end'>
          <Link href="/accounts">
            <a className="font-semibold">Accounts</a>
          </Link>
          <Link href="/blocks">
            <a className="ml-6">Blocks</a>
          </Link>
          <Link href="/transactions">
            <a className="ml-6 mr-1">Transactions</a>
          </Link>
        </nav>
      </header>
    </div>
  )
};

export default Navbar;

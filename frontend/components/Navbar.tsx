'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Config',
    dropdown: [
      { label: 'Primary Categories', href: '/primary-category' },
      { label: 'Secondary Categories', href: '/secondary-categories' },
    ],
  },
  { label: 'Transactions', href: '/transactions' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <nav className="bg-teal-500 text-white px-6 py-3 shadow-md relative flex items-center justify-between">
      {/* App name */}
      <div className="text-xl font-bold cursor-default select-none">
        Where I Spend ?
      </div>

      {/* Navigation links */}
      <ul className="flex gap-6">
        {navItems.map((item) =>
          item.dropdown ? (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => setIsConfigOpen(true)}
              onMouseLeave={() => setIsConfigOpen(false)}
            >
              <button
                className="cursor-pointer hover:underline font-semibold flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={isConfigOpen}
              >
                {item.label}
                <svg
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isConfigOpen && (
                <ul className="absolute bg-gray-700 rounded shadow-lg mt-1 py-2 w-48 z-10">
                  {item.dropdown.map((sub) => (
                    <li key={sub.href} className="px-4 py-2 hover:bg-gray-600">
                      <Link
                        href={sub.href}
                        className={`block ${
                          pathname === sub.href ? 'font-bold underline' : ''
                        }`}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover:underline ${
                  pathname === item.href ? 'font-bold underline' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}

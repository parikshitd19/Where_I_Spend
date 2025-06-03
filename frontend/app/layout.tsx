// app/layout.tsx
import './globals.css';
import Navbar from '../components/Navbar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Where I Spend?',
  description: 'A personal expense tracker app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

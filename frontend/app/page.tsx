// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to Where I Spend ?</h1>
      <p className="text-lg mb-8 text-gray-700">
        Track your expenses easily and stay on top of your finances.
      </p>

      {/* <div className="flex justify-center gap-6">
        <Link
          href="/primary-categories"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Primary Categories
        </Link>

        <Link
          href="/secondary-categories"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Secondary Categories
        </Link>

        <Link
          href="/transactions"
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Transactions
        </Link>
      </div> */}
    </div>
  );
}

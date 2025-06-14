// app/page.tsx
import Link from 'next/link';
import MonthSummaryCard from './MonthSummaryCard';

export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to Where I Spend ?</h1>
      <p className="text-lg mb-8 text-gray-700">
        Track your expenses easily and stay on top of your finances.
      </p>
      <div className='grid grid-cols-4'>
        <div></div>
        <div>
          <MonthSummaryCard/>
        </div>
        <div></div>
        <div></div>
      </div>
      
    </div>
  );
}

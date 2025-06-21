import InputTransactionForm from './InputTransactionForm';

export default function AddTransactionPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Record a new Transaction</h1>
      <InputTransactionForm/>
    </div>
  );
}
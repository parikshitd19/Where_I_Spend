import InputTransactionForm from './InputTransactionForm';

export default function AddTransactionPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add a Transaction</h1>
      <InputTransactionForm/>
    </div>
  );
}
import TransactionTable from "./TransactionTable";

export default function ViewTransactionsPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">View Transactions</h1>
            <TransactionTable/>
        </div>
    )
}
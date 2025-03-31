import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch transactions from the API
  useEffect(() => {
    fetch('http://my-app-service:9090/api/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <Link
            to="/add-transaction"  // Link to AddTransactionPage
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Add New Transaction
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by book title or user name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="px-4 py-2">Transaction ID</th>
                  <th className="px-4 py-2">Book Title</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Issue Date</th>
                  <th className="px-4 py-2">Return Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="px-4 py-2">{transaction.id}</td>
                    <td className="px-4 py-2">{transaction.book.title}</td>
                    <td className="px-4 py-2">{transaction.user.name}</td>
                    <td className="px-4 py-2">{transaction.issueDate}</td>
                    <td className="px-4 py-2">
                      {transaction.returnDate || 'Not Returned'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No transactions found.</p>
        )}
      </div>
    </div>
  );
}

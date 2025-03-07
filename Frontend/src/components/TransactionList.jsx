import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Transaction List</h1>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Book Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Issue Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Return Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{transaction.book.title}</td>
                <td className="px-6 py-4 border-b">{transaction.user.name}</td>
                <td className="px-6 py-4 border-b">{transaction.issueDate}</td>
                <td className="px-6 py-4 border-b">
                  {transaction.returnDate || (
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs">
                      Not Returned
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

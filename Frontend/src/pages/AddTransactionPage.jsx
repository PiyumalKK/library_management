import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

export default function AddTransactionPage() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [transactionType, setTransactionType] = useState('borrow');
  const [issueDate, setIssueDate] = useState('');
  const [transactionId, setTransactionId] = useState(''); // Added for return transaction
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch books and users from the API
  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const fetchBooks = () => {
    fetch('http://57.158.185.84:31387/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  };

  const fetchUsers = () => {
    fetch('http://57.158.185.84:31387/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  // Handle adding a new transaction
  const handleAddTransaction = async () => {
    if (transactionType === 'borrow') {
      // For borrow transactions
      if (!selectedBook || !selectedUser || !issueDate) {
        setError('Please fill all required fields.');
        return;
      }

      try {
        const url = `http://57.158.185.84:31387/api/transactions/issue?bookId=${selectedBook}&userId=${selectedUser}`;
        const response = await fetch(url, {
          method: 'POST',
        });

        if (response.ok) {
          navigate('/transactions'); // Redirect to transactions page if successful
        } else {
          setError('Failed to add transaction.');
        }
      } catch (error) {
        console.error('Error adding transaction:', error);
        setError('Something went wrong. Please try again later.');
      }
    } else if (transactionType === 'return') {
      // For return transactions
      if (!transactionId) {
        setError('Please provide a transaction ID for return.');
        return;
      }

      try {
        const url = `http://57.158.185.84:31387/api/transactions/return?transactionId=${transactionId}`;
        const response = await fetch(url, {
          method: 'POST',
        });

        if (response.ok) {
          navigate('/transactions'); // Redirect to transactions page if successful
        } else {
          setError('Failed to return book.');
        }
      } catch (error) {
        console.error('Error returning book:', error);
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Transaction</h1>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 mb-4 text-center font-semibold">
            {error}
          </div>
        )}

        {/* Add Transaction Form */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label htmlFor="transactionType" className="text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="borrow">Borrow</option>
              <option value="return">Return</option>
            </select>
          </div>

          {transactionType === 'borrow' && (
            <>
              <div className="flex flex-col">
                <label htmlFor="book" className="text-sm font-medium text-gray-700 mb-2">
                  Select Book
                </label>
                <select
                  id="book"
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Book</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="user" className="text-sm font-medium text-gray-700 mb-2">
                  Select User
                </label>
                <select
                  id="user"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="issueDate" className="text-sm font-medium text-gray-700 mb-2">
                  Issue Date
                </label>
                <input
                  type="date"
                  id="issueDate"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {transactionType === 'return' && (
            <div className="flex flex-col">
              <label htmlFor="transactionId" className="text-sm font-medium text-gray-700 mb-2">
                Transaction ID
              </label>
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter transaction ID"
              />
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleAddTransaction}
              className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  // Fetch users from the API
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users
  const fetchUsers = () => {
    fetch('http://localhost:9090/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Failed to load users.');
      });
  };

  // Delete user by ID
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9090/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted user from the local state
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error('Failed to delete user');
        setError('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Users</h1>
          <Link
            to="/add-user"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Add New User
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 mb-4 text-center font-semibold">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Users List */}
        {filteredUsers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  {user.name}
                </h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/users/${user.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No users found.</p>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Book List</h1>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Author</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Available</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{book.title}</td>
                <td className="px-6 py-4 border-b">{book.author}</td>
                <td className="px-6 py-4 border-b">{book.category}</td>
                <td className="px-6 py-4 border-b">
                  {book.available ? (
                    <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">Available</span>
                  ) : (
                    <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs">Issued</span>
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

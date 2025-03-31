import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch books from the API
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("http://57.158.185.84:31387/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  };

  // Delete a book
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await fetch(`http://57.158.185.84:31387/api/books/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove the deleted book from the local state
          setBooks(books.filter((book) => book.id !== id));
        } else {
          console.error("Failed to delete the book");
          alert("An error occurred while deleting the book.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the book.");
      }
    }
  };

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Books</h1>
          <Link
            to="/add-book"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Add New Book
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search books by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Books List */}
        {filteredBooks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  {book.title}
                </h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Author:</span> {book.author}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Category:</span> {book.category}
                </p>
                <p
                  className={`font-semibold ${
                    book.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {book.available ? "Available" : "Issued"}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/books/${book.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md shadow hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No books found.</p>
        )}
      </div>
    </div>
  );
}

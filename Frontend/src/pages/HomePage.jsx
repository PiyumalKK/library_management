import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to MyLibrary Management System Piyumal AABB
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Manage books, users, and transactions efficiently with our simple and powerful system.
          </p>
          <Link
            to="/books"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow hover:bg-gray-100"
          >
            Explore Books
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 w-full h-8 bg-gray-50 rounded-t-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Manage Books</h3>
              <p className="text-gray-600">
                Add, edit, and delete books in the library with ease. Track their availability in real-time.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">User Management</h3>
              <p className="text-gray-600">
                Keep track of library users and manage their profiles efficiently.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Transactions</h3>
              <p className="text-gray-600">
                Monitor book issues and returns with an easy-to-use transaction system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Started Today!</h2>
          <p className="text-lg text-gray-700 mb-8">
            Explore the library and make use of our efficient tools to simplify your library management process.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/users"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
            >
              Manage Users
            </Link>
            <Link
              to="/transactions"
              className="px-6 py-3 bg-gray-100 text-blue-600 font-semibold rounded-md shadow hover:bg-gray-200"
            >
              View Transactions
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2024 MyLibrary Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

//
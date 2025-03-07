import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Library</h1>
            <p className="text-sm mt-2">Your go-to place for books and knowledge.</p>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-6">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/books" className="hover:underline">Books</Link>
            <Link to="/users" className="hover:underline">Users</Link>
            <Link to="/transactions" className="hover:underline">Transactions</Link>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="h-6 w-6 fill-current hover:text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.35C0 23.407.593 24 1.325 24h11.495V14.708H9.692v-3.63h3.128V8.327c0-3.1 1.893-4.786 4.658-4.786 1.325 0 2.463.099 2.795.143v3.243h-1.916c-1.505 0-1.796.716-1.796 1.764v2.311h3.59l-.467 3.63h-3.123V24h6.127c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg className="h-6 w-6 fill-current hover:text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 4.557a9.807 9.807 0 01-2.828.775A4.932 4.932 0 0023.337 3.4a9.865 9.865 0 01-3.127 1.194 4.917 4.917 0 00-8.385 4.482A13.94 13.94 0 011.671 3.149a4.917 4.917 0 001.523 6.573A4.902 4.902 0 01.96 9.1v.062a4.916 4.916 0 003.946 4.827 4.902 4.902 0 01-2.212.084 4.918 4.918 0 004.597 3.417A9.867 9.867 0 010 21.543a13.93 13.93 0 007.548 2.212c9.054 0 14.001-7.503 14.001-14.002 0-.213-.005-.426-.015-.637A10.025 10.025 0 0024 4.557z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="h-6 w-6 fill-current hover:text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.333 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.745 0 8.332.012 7.052.072 5.72.132 4.479.429 3.511 1.396 2.543 2.364 2.246 3.605 2.186 4.937.012 8.332 0 8.745 0 12c0 3.255.012 3.668.072 4.948.06 1.332.257 2.573 1.225 3.541.968.968 2.209 1.165 3.541 1.225C8.332 23.988 8.745 24 12 24s3.668-.012 4.948-.072c1.332-.06 2.573-.257 3.541-1.225.968-.968 1.165-2.209 1.225-3.541.06-1.332.072-1.745.072-4.948s-.012-3.668-.072-4.948c-.06-1.332-.257-2.573-1.225-3.541-.968-.968-2.209-1.165-3.541-1.225C15.668.012 15.255 0 12 0z" />
                <circle cx="12" cy="12" r="3.6" />
                <path d="M16.8 5.2a1.2 1.2 0 112.4 0 1.2 1.2 0 01-2.4 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-sm">
          © {new Date().getFullYear()} Library Management. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

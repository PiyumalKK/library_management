import { Bars3Icon } from '@heroicons/react/24/outline'; // Updated import for Heroicons v2
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-xl font-bold">
          Library System
        </Link>
        <div className="md:hidden">
          {/* Bars3Icon is used for the mobile menu */}
          <Bars3Icon
            className="h-6 w-6 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/books" className="hover:text-gray-300">
              Books
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-gray-300">
              Users
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="hover:text-gray-300">
              Transactions
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-gray-300">
                Books
              </Link>
            </li>
            <li>
              <Link to="/users" className="hover:text-gray-300">
                Users
              </Link>
            </li>
            <li>
              <Link to="/transactions" className="hover:text-gray-300">
                Transactions
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

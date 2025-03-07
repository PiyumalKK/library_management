import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import UsersPage from './pages/UsersPage';
import TransactionsPage from './pages/TransactionsPage';
import AddBookPage from "./pages/AddBookPage";
import AddUserPage from './pages/AddUserPage';
import AddTransactionPage from './pages/AddTransactionPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/add-transaction" element={<AddTransactionPage />} />
      </Routes>
    </Router>
  );
}

export default App;

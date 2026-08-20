import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BorrowPage from './pages/BorrowPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/borrow" element={<BorrowPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

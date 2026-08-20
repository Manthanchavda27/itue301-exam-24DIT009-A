import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/books')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch books. Make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <h2 className="page-title">All Books</h2>
      <p className="page-subtitle">Browse the library collection</p>

      {loading && <p className="status-msg">⏳ Loading books...</p>}
      {error && <p className="error-msg">⚠️ {error}</p>}

      <div className="books-grid">
        {data.map(book => (
          <BookCard
            key={book.id || book._id}
            title={book.title}
            author={book.author}
            category={book.category}
            available={book.available}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksPage;

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
      .catch(err => {
        setError('Failed to fetch books. Make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: '24px' }}>Loading books...</p>;
  if (error)   return <p style={{ padding: '24px', color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '24px' }}>
      <h2>All Books</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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

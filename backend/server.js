require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Custom request logger middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} [${new Date().toISOString()}]`);
  next();
});

// In-memory data
const books = [
  { id: '1', title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', isbn: '9780132350884', available: true },
  { id: '2', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Programming', isbn: '9780201616224', available: false },
  { id: '3', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', isbn: '9780262033848', available: true },
];

const borrowings = [
  { id: '1', memberId: 'm1', bookId: '2', borrowDate: '2026-08-01', returnDate: '2026-08-15', status: 'borrowed' },
];

// REST Endpoints
app.get('/api/v1/books', (req, res) => {
  res.status(200).json(books);
});

app.get('/api/v1/borrowings', (req, res) => {
  res.status(200).json(borrowings);
});

app.post('/api/v1/borrowings', (req, res) => {
  const { memberId, bookId, borrowDate, returnDate, status } = req.body;
  if (!memberId || !bookId || !borrowDate || !returnDate) {
    return res.status(400).json({ error: 'memberId, bookId, borrowDate and returnDate are required' });
  }
  const newBorrowing = {
    id: String(borrowings.length + 1),
    memberId, bookId, borrowDate, returnDate,
    status: status || 'borrowed',
  };
  borrowings.push(newBorrowing);
  res.status(201).json(newBorrowing);
});

// Global error-handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

const router = require('express').Router();
const Borrowing = require('../models/Borrowing');
const Book = require('../models/Book');

// GET all borrowings — populated with member and book details
router.get('/', async (req, res, next) => {
  try {
    const borrowings = await Borrowing.find()
      .populate('memberId', 'name email department')
      .populate('bookId', 'title author category');
    res.status(200).json(borrowings);
  } catch (err) {
    next(err);
  }
});

// GET single borrowing
router.get('/:id', async (req, res, next) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id)
      .populate('memberId', 'name email department')
      .populate('bookId', 'title author category');
    if (!borrowing) return res.status(404).json({ error: 'Borrowing record not found' });
    res.status(200).json(borrowing);
  } catch (err) {
    next(err);
  }
});

// POST create borrowing — also marks book as unavailable
router.post('/', async (req, res, next) => {
  try {
    const { memberId, bookId, borrowDate, returnDate, status } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (!book.available) return res.status(400).json({ error: 'Book is not available for borrowing' });

    const borrowing = await Borrowing.create({ memberId, bookId, borrowDate, returnDate, status });

    // Mark book as unavailable
    await Book.findByIdAndUpdate(bookId, { available: false });

    res.status(201).json(borrowing);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation failed', details: messages });
    }
    next(err);
  }
});

// PUT update borrowing status — if returned, mark book available again
router.put('/:id', async (req, res, next) => {
  try {
    const borrowing = await Borrowing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!borrowing) return res.status(404).json({ error: 'Borrowing record not found' });

    if (req.body.status === 'returned') {
      await Book.findByIdAndUpdate(borrowing.bookId, { available: true });
    }

    res.status(200).json(borrowing);
  } catch (err) {
    next(err);
  }
});

// DELETE borrowing
router.delete('/:id', async (req, res, next) => {
  try {
    const borrowing = await Borrowing.findByIdAndDelete(req.params.id);
    if (!borrowing) return res.status(404).json({ error: 'Borrowing record not found' });
    res.status(200).json({ message: 'Borrowing record deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

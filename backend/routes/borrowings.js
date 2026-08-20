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

// POST create borrowing — auto creates member and book if not exists
router.post('/', async (req, res, next) => {
  try {
    const Member = require('../models/Member');
    const { memberName, bookTitle, borrowDate, returnDate } = req.body;

    if (!memberName || !bookTitle || !borrowDate || !returnDate) {
      return res.status(400).json({ error: 'memberName, bookTitle, borrowDate and returnDate are required' });
    }

    // Find or create member by name
    let member = await Member.findOne({ name: new RegExp(`^${memberName}$`, 'i') });
    if (!member) {
      member = await Member.create({
        name: memberName,
        email: `${memberName.toLowerCase().replace(/\s+/g, '.')}@library.com`,
        department: 'General',
      });
    }

    // Find or create book by title
    let book = await Book.findOne({ title: new RegExp(`^${bookTitle}$`, 'i') });
    if (!book) {
      book = await Book.create({
        title: bookTitle,
        author: 'Unknown',
        category: 'General',
        available: false,
      });
    } else if (!book.available) {
      return res.status(400).json({ error: `"${book.title}" is currently not available for borrowing` });
    } else {
      await Book.findByIdAndUpdate(book._id, { available: false });
    }

    const borrowing = await Borrowing.create({
      memberId: member._id,
      bookId: book._id,
      borrowDate,
      returnDate,
    });

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

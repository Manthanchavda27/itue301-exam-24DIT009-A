require('dotenv').config();
const connectDB = require('./db');
const Book = require('./models/Book');
const Member = require('./models/Member');
const Borrowing = require('./models/Borrowing');

const run = async () => {
  await connectDB();

  const book = await Book.create({
    title: 'Clean Code', author: 'Robert C. Martin',
    category: 'Programming', isbn: '9780132350884', available: true,
  });
  console.log('Book created:', book.title);

  const member = await Member.create({
    name: 'John Doe', email: 'john@example.com',
    phone: '9876543210', department: 'Computer Science',
  });
  console.log('Member created:', member.name);

  const borrowing = await Borrowing.create({
    memberId: member._id, bookId: book._id,
    borrowDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'borrowed',
  });
  console.log('Borrowing created with status:', borrowing.status);

  // Validation failure — missing required name
  try {
    await Member.create({ email: 'noname@example.com', department: 'IT' });
  } catch (err) {
    console.log('Validation error (missing name):', err.errors.name.message);
  }

  // Validation failure — invalid enum status
  try {
    await Borrowing.create({
      memberId: member._id, bookId: book._id,
      borrowDate: new Date(), returnDate: new Date(),
      status: 'lost',
    });
  } catch (err) {
    console.log('Validation error (invalid status):', err.errors.status.message);
  }

  process.exit(0);
};

run();

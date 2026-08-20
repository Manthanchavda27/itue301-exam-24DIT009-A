const Book = require('./models/Book');
const Member = require('./models/Member');

const staticBooks = [
  { title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', isbn: '9780132350884', available: true },
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Programming', isbn: '9780201616224', available: true },
  { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', isbn: '9780262033848', available: true },
  { title: 'You Don\'t Know JS', author: 'Kyle Simpson', category: 'JavaScript', isbn: '9781491924464', available: true },
  { title: 'Design Patterns', author: 'Gang of Four', category: 'Software Engineering', isbn: '9780201633610', available: true },
];

const staticMembers = [
  { name: 'John Doe', email: 'john@example.com', phone: '9876543210', department: 'Computer Science' },
  { name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', department: 'Information Technology' },
];

const seedDB = async () => {
  try {
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      await Book.insertMany(staticBooks);
      console.log('✅ Static books inserted into MongoDB');
    }

    const memberCount = await Member.countDocuments();
    if (memberCount === 0) {
      await Member.insertMany(staticMembers);
      console.log('✅ Static members inserted into MongoDB');
    }
  } catch (err) {
    console.error('Seeder error:', err.message);
  }
};

module.exports = seedDB;

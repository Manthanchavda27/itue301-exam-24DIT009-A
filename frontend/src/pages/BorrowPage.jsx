import { useState } from 'react';
import axios from 'axios';

const BorrowPage = () => {
  const [form, setForm] = useState({
    memberName: '',
    bookTitle: '',
    borrowDate: '',
    returnDate: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Find member by name
      const membersRes = await axios.get('http://localhost:5000/api/v1/members');
      const member = membersRes.data.find(
        m => m.name.toLowerCase() === form.memberName.toLowerCase()
      );
      if (!member) {
        setError(`Member "${form.memberName}" not found. Please check the name.`);
        setSubmitting(false);
        return;
      }

      // Find book by title
      const booksRes = await axios.get('http://localhost:5000/api/v1/books');
      const book = booksRes.data.find(
        b => b.title.toLowerCase() === form.bookTitle.toLowerCase()
      );
      if (!book) {
        setError(`Book "${form.bookTitle}" not found. Please check the title.`);
        setSubmitting(false);
        return;
      }

      if (!book.available) {
        setError(`"${book.title}" is currently not available.`);
        setSubmitting(false);
        return;
      }

      await axios.post('http://localhost:5000/api/v1/borrowings', {
        memberId: member._id,
        bookId: book._id,
        borrowDate: form.borrowDate,
        returnDate: form.returnDate,
      });

      setSuccess(`✅ "${book.title}" borrowed by ${member.name} successfully!`);
      setForm({ memberName: '', bookTitle: '', borrowDate: '', returnDate: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit borrow request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">Borrow a Book</h2>
      <p className="page-subtitle">Fill in the details to submit a borrow request</p>

      <div className="form-card" style={{ marginTop: '24px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Member Name</label>
            <input
              name="memberName"
              value={form.memberName}
              onChange={handleChange}
              placeholder="Enter member name"
              required
            />
          </div>

          <div className="form-group">
            <label>Book Title</label>
            <input
              name="bookTitle"
              value={form.bookTitle}
              onChange={handleChange}
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="form-group">
            <label>Borrow Date</label>
            <input type="date" name="borrowDate" value={form.borrowDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Return Date</label>
            <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>

        {(form.memberName || form.bookTitle) && (
          <div className="live-preview">
            {form.memberName && <p>👤 Member: <strong>{form.memberName}</strong></p>}
            {form.bookTitle  && <p>📖 Book: <strong>{form.bookTitle}</strong></p>}
            {form.borrowDate && <p>📅 From: <strong>{form.borrowDate}</strong></p>}
            {form.returnDate && <p>📅 Until: <strong>{form.returnDate}</strong></p>}
          </div>
        )}

        {error   && <p className="error-msg" style={{ marginTop: '16px' }}>⚠️ {error}</p>}
        {success && <div className="success-msg">{success}</div>}
      </div>
    </div>
  );
};

export default BorrowPage;

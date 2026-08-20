import { useState } from 'react';

const BorrowPage = () => {
  const [form, setForm] = useState({
    memberName: '',
    bookTitle: '',
    borrowDate: '',
    returnDate: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page">
      <h2 className="page-title">Borrow a Book</h2>
      <p className="page-subtitle">Fill in the details to submit a borrow request</p>

      <div className="form-card" style={{ marginTop: '24px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Member Name</label>
            <input name="memberName" value={form.memberName} onChange={handleChange} placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label>Book Title</label>
            <input name="bookTitle" value={form.bookTitle} onChange={handleChange} placeholder="Enter book title" required />
          </div>
          <div className="form-group">
            <label>Borrow Date</label>
            <input type="date" name="borrowDate" value={form.borrowDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Return Date</label>
            <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-primary">Submit Request</button>
        </form>

        {(form.memberName || form.bookTitle) && (
          <div className="live-preview">
            {form.memberName && <p>👤 Member: <strong>{form.memberName}</strong></p>}
            {form.bookTitle && <p>📖 Book: <strong>{form.bookTitle}</strong></p>}
            {form.borrowDate && <p>📅 From: <strong>{form.borrowDate}</strong></p>}
            {form.returnDate && <p>📅 Until: <strong>{form.returnDate}</strong></p>}
          </div>
        )}

        {submitted && (
          <div className="success-msg">
            ✅ Borrow request submitted for <strong>{form.memberName}</strong> — <strong>{form.bookTitle}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowPage;

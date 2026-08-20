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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = { display: 'block', margin: '8px 0 16px', padding: '8px', width: '300px' };
  const labelStyle = { fontWeight: 'bold' };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Borrow a Book</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Member Name</label>
        <input style={inputStyle} name="memberName" value={form.memberName} onChange={handleChange} required />

        <label style={labelStyle}>Book Title</label>
        <input style={inputStyle} name="bookTitle" value={form.bookTitle} onChange={handleChange} required />

        <label style={labelStyle}>Borrow Date</label>
        <input style={inputStyle} type="date" name="borrowDate" value={form.borrowDate} onChange={handleChange} required />

        <label style={labelStyle}>Return Date</label>
        <input style={inputStyle} type="date" name="returnDate" value={form.returnDate} onChange={handleChange} required />

        <button type="submit" style={{ padding: '10px 24px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>

      {form.memberName && (
        <p style={{ marginTop: '16px' }}>Member: <strong>{form.memberName}</strong></p>
      )}
      {form.bookTitle && (
        <p>Book: <strong>{form.bookTitle}</strong></p>
      )}

      {submitted && (
        <p style={{ color: 'green', marginTop: '12px' }}>
          ✅ Borrow request submitted for <strong>{form.memberName}</strong> — <strong>{form.bookTitle}</strong>
        </p>
      )}
    </div>
  );
};

export default BorrowPage;

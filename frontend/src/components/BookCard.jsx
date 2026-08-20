const BookCard = ({ title, author, category, available }) => {
  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>Author: <span>{author}</span></p>
      <p>Category: <span>{category}</span></p>
      <span className={`badge ${available ? 'available' : 'unavailable'}`}>
        {available ? '✅ Available' : '❌ Not Available'}
      </span>
    </div>
  );
};

export default BookCard;

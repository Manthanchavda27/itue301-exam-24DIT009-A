const BookCard = ({ title, author, category, available }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '8px', width: '220px' }}>
      <h3 style={{ margin: '0 0 8px' }}>{title}</h3>
      <p style={{ margin: '4px 0' }}><strong>Author:</strong> {author}</p>
      <p style={{ margin: '4px 0' }}><strong>Category:</strong> {category}</p>
      <p style={{
        margin: '8px 0 0',
        fontWeight: 'bold',
        color: available ? 'green' : 'red',
      }}>
        {available ? '✅ Available' : '❌ Not Available'}
      </p>
    </div>
  );
};

export default BookCard;

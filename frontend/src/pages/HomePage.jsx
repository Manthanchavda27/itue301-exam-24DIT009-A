import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-hero">
      <h1>📚 Library Book Management System</h1>
      <p>Browse the collection, check availability, and borrow books with ease.</p>
      <div className="home-cards">
        <Link to="/books" className="home-card">
          <div className="icon">📖</div>
          <h3>Browse Books</h3>
        </Link>
        <Link to="/borrow" className="home-card">
          <div className="icon">📝</div>
          <h3>Borrow a Book</h3>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

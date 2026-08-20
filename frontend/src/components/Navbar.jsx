import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="navbar-brand">📚 LibraryMS</span>
      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>
      <Link to="/borrow">Borrow</Link>
    </nav>
  );
};

export default Navbar;

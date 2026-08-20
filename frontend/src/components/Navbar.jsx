import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ background: '#1a1a2e', padding: '12px 24px', display: 'flex', gap: '24px' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
      <Link to="/books" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Books</Link>
      <Link to="/borrow" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Borrow</Link>
    </nav>
  );
};

export default Navbar;

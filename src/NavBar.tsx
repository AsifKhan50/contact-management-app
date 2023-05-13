import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav >
      <button className="toggle-button">&#9776;</button>
      <Link to="/" style={{ marginBottom: '1rem' }}>Home</Link>
      <Link to="/chats" style={{ marginBottom: '1rem' }}>Chats</Link>
    </nav>
  );
};

export default NavBar;

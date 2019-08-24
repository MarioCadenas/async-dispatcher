import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <header className="App-header">
      <Link to="/" className="App-link">
        Home
      </Link>
      <Link to="/todos" className="App-link">
        Todos
      </Link>
    </header>
  );
};

export default Menu;

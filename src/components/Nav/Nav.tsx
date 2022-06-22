import * as React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

function Nav() {
  return (
    <nav>
      <h1>Beer Buddy</h1>
      <ul>
        <li>
          <Link to="/">Browse</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/authority">Authority</Link>
          </li>
          <li>
            <Link to="/register-voter">Register Voter</Link>
          </li>
          <li>
            <Link to="/register-candidate">Register Candidate</Link>
          </li>
          <li>
            <Link to="/vote">Vote</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

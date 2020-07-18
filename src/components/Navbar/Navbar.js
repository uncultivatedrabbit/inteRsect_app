import React from "react";
import { Link } from "react-router-dom";
import './Navbar.scss'

export default function Navbar() {
  return (
    <nav className="Navbar">
      <h1 id="Nav__Logo">inteRsect</h1>
      {/* need to create functionality where navbar is different for logged in and not logged in */}
      <div className="Nav__Links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

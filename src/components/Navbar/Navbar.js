import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import PropTypes from "prop-types";
import { slide as Menu } from "react-burger-menu";

export default function Navbar(props) {
  const loggedIn = props.loggedIn;

  return (
    <nav className="Navbar">
      <Link to="/">
        <h1 id="Nav__Logo">inteRsect</h1>
      </Link>
      {/* need to create functionality where navbar is different for logged in and not logged in */}
      <div className="Nav__Links">
        {loggedIn ? (
          <>
            <Link to="/userAccount/:id">Account</Link>
            <Link to="/userAccount/:id/projects">Projects</Link>
            <Link to="/search">Search</Link>
            <Link to="/logout">Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  loggedIn: PropTypes.bool,
};

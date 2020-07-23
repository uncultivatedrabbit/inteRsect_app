import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Context from "../../Context";

export default class Navbar extends Component {
  static contextType = Context;

  render() {
    return (
      <nav className="Navbar">
        <Link to="/">
          <h1 id="Nav__Logo">inteRsect</h1>
        </Link>
        {/* need to create functionality where navbar is different for logged in and not logged in */}
        <div className="Nav__Links">
          {this.context.isLoggedIn ? (
            <>
              <Link to="/user/:userId">Account</Link>
              <Link to="/search">Search</Link>
              <Link to="/">Log Out</Link>
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
}

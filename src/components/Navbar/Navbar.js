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
        <div className="Nav__Links">
          {this.context.isLoggedIn ? (
            <>
              <Link to={`/user/${this.context.currentUser.id}`}>
                <i className="fas fa-home"></i>
              </Link>
              <Link to="/search">
                <i className="fas fa-search"></i>
              </Link>
              <Link to="/">
                <i className="fas fa-sign-out-alt"></i>
              </Link>
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

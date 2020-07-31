import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Context from "../../Context";
import TokenService from "../../services/token-service";

export default class Navbar extends Component {
  static contextType = Context;

  handleLogOut() {
    TokenService.clearAuthToken();
    window.location.href = "/";
  }

  render() {
    return (
      <nav className="Navbar">
        <Link to="/">
          <h1 id="Nav__Logo">inteRsect</h1>
        </Link>
        <div className="Nav__Links">
          {this.context.isLoggedIn ? (
            <>
              <Link to={`/`}>
                <i className="fas fa-home"></i>
              </Link>
              <Link to="/search">
                <i className="fas fa-search"></i>
              </Link>
              <i
                onClick={this.handleLogOut}
                className="fas fa-sign-out-alt"></i>
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

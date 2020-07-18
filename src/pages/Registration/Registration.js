import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Registration.scss";

export default class Registration extends Component {
  render() {
    return (
      <>
        <header className="Registration__Header">
          <Link to="/" className="Registration__Logo">
            inteRsect
          </Link>
        </header>
        <form className="Reg__Form">
          <div className="Input__Container">
            <label htmlFor="Reg__Email">
              Email <i className="far fa-envelope"></i>
            </label>
            <input type="email" name="email" id="Reg__Email" />
          </div>
          <div className="Input__Container">
            <label htmlFor="Reg__Password">
              Password <i className="fas fa-lock"></i>
            </label>
            <input type="password" name="password" id="Reg__Password" />
          </div>
          <div className="Input__Container">
            <label htmlFor="Reg__Verification">
              Re-enter Password <i className="fas fa-lock"></i>
            </label>
            <input type="password" name="verification" id="Reg__Verification" />
          </div>

          <input type="submit" id="Reg__Submit" value="Register" />
        </form>
        <section className="Redirect__To__Login">
          <p>Already have an account?</p>
          <Link to="/login" id="Login__Redirect">
            Login Here
          </Link>
        </section>
      </>
    );
  }
}

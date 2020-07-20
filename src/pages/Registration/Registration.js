import React, { Component } from "react";
import { Link } from "react-router-dom";
import VerificationService from "../../services/verification";
import AuthApiService from "../../services/auth-api-service";
import "./Registration.scss";

export default class Registration extends Component {
  state = { error: null };

  handleSubmit = (e) => {
    e.preventDefault();
    const { full_name, email, password, verification } = e.target;
    const passwordVerified = VerificationService.verifyPasswordsMatch(
      password.value,
      verification.value
    );
    if (passwordVerified) {
      AuthApiService.postUser({
        full_name: full_name.value,
        password: password.value,
        email: email.value,
      });
      this.setState({ error: null });
    } else {
      this.setState({ error: "Passwords don't match" });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <header className="Registration__Header">
          <Link to="/" className="Registration__Logo">
            inteRsect
          </Link>
        </header>
        <form className="Reg__Form" onSubmit={this.handleSubmit}>
          <div role="alert">
            {error && <p className="Error__Msg">{error}</p>}
          </div>
          <div className="Input__Container">
            <label htmlFor="Reg__Full__Name">
              Full Name <i className="far fa-user-circle"></i>
            </label>
            <input type="text" required name="full_name" id="Reg__Full__Name" />
          </div>
          <div className="Input__Container">
            <label htmlFor="Reg__Email">
              Email <i className="far fa-envelope"></i>
            </label>
            <input type="email" required name="email" id="Reg__Email" />
          </div>
          <div className="Input__Container">
            <label htmlFor="Reg__Password">
              Password <i className="fas fa-lock"></i>
            </label>
            <input
              type="password"
              required
              name="password"
              id="Reg__Password"
            />
          </div>
          <div className="Input__Container">
            <label htmlFor="Reg__Verification">
              Re-enter Password <i className="fas fa-lock"></i>
            </label>
            <input
              type="password"
              required
              name="verification"
              id="Reg__Verification"
            />
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

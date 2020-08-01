import React, { Component } from "react";
import { Link } from "react-router-dom";
import VerificationService from "../../services/verification-service";
import AuthApiService from "../../services/auth-api-service";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Registration.scss";
import Context from "../../Context";

export default class Registration extends Component {
  static contextType = Context;

  state = { error: null };

  handleSubmit = (e) => {
    e.preventDefault();
    const { full_name, email, password, verification } = e.target;
    const validPassword = VerificationService.verifyValidPassword(
      password.value
    );
    if (validPassword !== "Valid Password") {
      this.setState({ error: validPassword });
      return;
    }
    // verify that the passwords match before submitting to the server
    const passwordsMatch = VerificationService.verifyPasswordsMatch(
      password.value,
      verification.value
    );
    // if the credentials are okay begin POST request
    if (passwordsMatch) {
      AuthApiService.postUser({
        full_name: full_name.value,
        password: password.value,
        email: email.value,
      });

      full_name.value = "";
      password.value = "";
      email.value = "";
     
      this.context.setRedirectedFromReg(true);
      this.props.history.push("/login");

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
          <div role="alert">{error && <ErrorMessage error={error} />}</div>
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

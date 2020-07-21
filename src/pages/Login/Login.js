import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiAuthService from "../../services/auth-api-service";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Login.scss";

export default class Login extends Component {
  state = { error: null };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = e.target;
    ApiAuthService.postLogin({ email: email.value, password: password.value });
    this.props.history.push("/userAccount/:id")
  };
  render() {
    const { error } = this.state;
    return (
      <>
        <header className="Login__Header">
          <Link to="/" className="Login__Logo">
            inteRsect
          </Link>
        </header>
        <form className="Login__Form" onSubmit={this.handleSubmit}>
          {/* display errors to the UI */}
          <div role="alert">{error && <ErrorMessage error={error} />}</div>
          <div className="Input__Container">
            <label htmlFor="Login__Email">
              Email <i className="far fa-envelope"></i>
            </label>
            <input type="email" name="email" id="Login__Email" />
          </div>
          <div className="Input__Container">
            <label htmlFor="Login__Password">
              Password <i className="fas fa-lock"></i>
            </label>
            <input type="password" name="password" id="Login__Password" />
          </div>
          <input type="submit" id="Login__Submit" value="Login" />
        </form>
        <section className="Redirect__To__Reg">
          <p>Don't have an account?</p>
          <Link to="/register" id="Reg__Redirect">
            Register Here
          </Link>
        </section>
      </>
    );
  }
}

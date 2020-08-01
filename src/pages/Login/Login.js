import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiAuthService from "../../services/auth-api-service";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Login.scss";
import TokenService from "../../services/token-service";
import Context from "../../Context";

export default class Login extends Component {
  static defaultProps = {};
  static contextType = Context;
  state = { error: null };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = e.target;
    ApiAuthService.postLogin({ email: email.value, password: password.value })
      .then((res) => {
        email.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.handleLoginSuccess();
      })
      .catch((res) => this.setState({ error: res.error }));
  };

  handleLoginSuccess = () => {
    this.context.setRedirectedFromReg(false);
    this.props.history.push("/");
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
          {this.context.redirectedFromReg ? (
            <div className="Success">Registration Success</div>
          ) : (
            ""
          )}
          <div role="alert">{error && <ErrorMessage error={error} />}</div>
          <div className="Input__Container">
            <label htmlFor="Login__Email">
              Email <i className="far fa-envelope"></i>
            </label>
            <input type="email" required name="email" id="Login__Email" />
          </div>
          <div className="Input__Container">
            <label htmlFor="Login__Password">
              Password <i className="fas fa-lock"></i>
            </label>
            <input
              type="password"
              required
              name="password"
              id="Login__Password"
            />
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

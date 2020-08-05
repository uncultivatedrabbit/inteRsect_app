import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TokenService from "../../services/token-service";
import parseJwt from "../../utils/js/parseJwt";
import UserApiService from "../../services/user-api-service";
import Context from "../../Context";

export default class ErrorPage extends Component {
  static contextType = Context;

  componentDidMount() {
    this.verifyUserLoggedIn();
  }
  verifyUserLoggedIn() {
    const token = TokenService.getAuthToken();
    if (!token) {
      this.context.setIsLoggedIn(false);
    } else {
      const { user_id } = parseJwt(token);
      this.context.setIsLoggedIn(true);
      UserApiService.getUserById(user_id).then((data) => {
        this.context.setUser(data);
      });
    }
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="ErrorPage">
          <h1>This page doesn't exist.</h1>
        </div>
      </>
    );
  }
}

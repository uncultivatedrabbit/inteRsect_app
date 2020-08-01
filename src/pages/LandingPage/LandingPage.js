import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./LandingPage.scss";
import TokenService from "../../services/token-service";
import parseJwt from "../../utils/js/parseJwt";
import Context from "../../Context";
import HomePage from "../HomePage/HomePage";
import StaticLandingPage from "../../components/StaticLandingPage/StaticLandingPage";
import UserAccount from "../UserAccount/UserAccount";
import UserApiService from "../../services/user-api-service";

export default class LandingPage extends Component {
  static contextType = Context;

  componentDidMount() {
    this.checkIfUserLoggedIn();
  }

  checkIfUserLoggedIn() {
    const token = TokenService.getAuthToken();
    if (!token) {
      this.context.setIsLoggedIn(false);
    } else {
      const { user_id, sub } = parseJwt(token);
      this.context.setIsLoggedIn(true);
      UserApiService.getUserById(user_id).then(data => {
        this.context.setUser(data)
      })
    }
  }

  render() {
    return (
      <>
        <Navbar {...this.props} />
        {this.context.isLoggedIn ? <HomePage /> : <StaticLandingPage />}
      </>
    );
  }
}

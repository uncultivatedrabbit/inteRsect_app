import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./LandingPage.scss";
import TokenService from "../../services/token-service";
import parseJwt from "../../utils/js/parseJwt";
import Context from "../../Context";
import HomePage from "../HomePage/HomePage";
import StaticLandingPage from "../../components/StaticLandingPage/StaticLandingPage";

export default class LandingPage extends Component {
  static contextType = Context;

  componentDidMount() {
    this.checkIfUserLoggedIn();
  }

  checkIfUserLoggedIn() {
    const token = TokenService.getAuthToken();
    if (!token) {
      this.context.setIsLoggedIn(false);
    }
    const { user_id, sub } = parseJwt(token);
    this.context.setIsLoggedIn(true);
    this.context.setUser({ user_id, email: sub });
  }

  render() {
    return (
      <>
        <Navbar />
        {this.context.isLoggedIn ? (
          <HomePage/>
        ) : (
          <StaticLandingPage/>
        )}
      </>
    );
  }
}

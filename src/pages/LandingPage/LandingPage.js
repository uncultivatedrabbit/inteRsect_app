import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./LandingPage.scss";

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <Navbar loggedIn={false} />
        <div className="Landing__Page">
          <section className="Landing__Hero">
            <h2>Your personal hub for medical research</h2>
            <Link to="/register">Register Now</Link>
          </section>
          <section className="Landing__About">
            <h2>Discover medical research done by your peers</h2>
            <p>
              Share your own research, find opportunities for collaboration, and
              ensure you have the support you need to expand knowledge in your
              field.
            </p>
          </section>
        </div>
      </>
    );
  }
}

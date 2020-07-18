import React, { Component } from "react";
import "./UserAccount.scss";

import Navbar from "../../components/Navbar/Navbar";

export default class UserAccount extends Component {
  render() {
    return (
      <>
        <Navbar />
        <h1>User Account</h1>
        <section className="Profile__Header__Container">
          <h2>Homer Simpson</h2>
          <p>Medical Student</p>
          <p>Tufts University School of Medicine</p>
        </section>
        <section className="Profile__Details__Container">
          <h2>Biography</h2>
        </section>
      </>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Project from "../../components/Project/Project";
import "./UserAccount.scss";
import EditableUserInfo from "../../components/EditableUserInfo/EditableUserInfo";

import Navbar from "../../components/Navbar/Navbar";

export default class UserAccount extends Component {
  state = {
    email: "homer.simpson@tufts.edu",
    status: "Faculty",
    school: "Tufts University School of Medicine",
    specialties: ["surgery", "sports medicine"],
    isBeingEdited: false,
    biography: "This is a bio",
  };

  render() {
    const { email, status, school, specialties, biography } = this.state;
    return (
      <>
        <Navbar />
        <div className="User__Account">
          <section className="Profile__Header__Container">
            <h1 id="User__Logo">H</h1>
            <h2>Homer Simpson</h2>
            <EditableUserInfo userInfo={email} />
            <EditableUserInfo userInfo={status} />
            <EditableUserInfo userInfo={school} />
            <EditableUserInfo userInfo={specialties[0]} />
          </section>

          <section className="Profile__Details__Container">
            <h2>Biography</h2>
            <EditableUserInfo userInfo={biography} />
          </section>
          <section className="Projects__Container">
            <h2>Projects</h2>
            <div className="Projects">
              <Project />
            </div>
            <Link to="/addProject">Add New Project</Link>
          </section>
        </div>
      </>
    );
  }
}

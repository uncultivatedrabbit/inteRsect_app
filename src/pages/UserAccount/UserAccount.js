import React, { Component } from "react";
import { Link } from "react-router-dom";
import Project from "../../components/Project/Project";
import "./UserAccount.scss";

import Navbar from "../../components/Navbar/Navbar";

export default class UserAccount extends Component {
  state = {
    isEditable: true,
  };

  render() {
    return (
      <>
        <Navbar />
        <div className="User__Account">
          <section className="Profile__Header__Container">
            <h1 id="User__Logo">H</h1>
            <h2>Homer Simpson</h2>
            <div className="Editable">
              <p contentEditable={this.state.isEditable}>
                Email: homer.j.simpson@tufts.edu
              </p>
              <i className="fas fa-pencil-alt"></i>
            </div>
            <div className="Editable">
              <p contentEditable={this.state.isEditable}>Faculty</p>
              <i className="fas fa-pencil-alt"></i>
            </div>
            <div className="Editable">
              <p contentEditable={this.state.isEditable}>
                Tufts University School of Medicine
              </p>
              <i className="fas fa-pencil-alt"></i>
            </div>
            <div className="Editable">
              <p contentEditable={this.state.isEditable}>Specialties: </p>
              <i className="fas fa-pencil-alt"></i>
            </div>
          </section>
          <section className="Profile__Details__Container">
            <div className="Editable">
              <h2>Biography</h2>
              <i className="fas fa-pencil-alt"></i>
            </div>
            <p contentEditable={this.state.isEditable}>
              Please update with your bio!
            </p>
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

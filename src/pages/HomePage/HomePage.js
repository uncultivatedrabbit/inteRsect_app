import React, { Component } from "react";
import Context from "../../Context";
import UserApiService from "../../services/user-api-service";
import Project from "../../components/Project/Project";
import EditableUserInfo from "../../components/EditableUserInfo/EditableUserInfo";
import { Link } from "react-router-dom";
import HelperFunctions from "../../utils/js/helpers";
import "./HomePage.scss";

export default class HomePage extends Component {
  state = {
    editModeEnabled: false,
  };
  static contextType = Context;

  handleEditMode() {
    this.setState({ editModeEnabled: !this.state.editModeEnabled });
  }

  render() {
    const { currentUser } = this.context;
    return (
      <div className="Home__Page">
        <section className="Profile__Header__Container">
          <header>
            <h1 id="User__Logo">
              {typeof currentUser.full_name === "string"
                ? HelperFunctions.createUserLogo(currentUser.full_name)
                : ""}
            </h1>
          </header>
          <h2>
            Welcome{", "}
            {currentUser.full_name ? HelperFunctions.capitalCaseName(currentUser.full_name, " ") : ""}!
          </h2>
          <EditableUserInfo
            editModeEnabled={this.state.editModeEnabled}
            currentUserInfo={`email: ${currentUser.email}`}
            {...this.props}
          />
          <EditableUserInfo
            editModeEnabled={this.state.editModeEnabled}
            currentUserInfo={`university_affiliation: ${currentUser.university_affiliation}`}
            {...this.props}
          />
          <EditableUserInfo
            editModeEnabled={this.state.editModeEnabled}
            currentUserInfo={`academic_level: ${currentUser.academic_level}`}
            {...this.props}
          />
          {this.state.editModeEnabled ? <button
            onClick={() => this.handleEditMode()}
            id="edit-btn"
            className="Edit__Button">
            Finished Editing
          </button> : <button
            onClick={() => this.handleEditMode()}
            id="edit-btn"
            className="Edit__Button">
            Edit
          </button>}
        </section>
        <section className="Profile__Details__Container">
          <h2>Biography</h2>
          <EditableUserInfo
            editModeEnabled={this.state.editModeEnabled}
            currentUserInfo={`biography: ${currentUser.biography}`}
            {...this.props}
          />
        </section>
        <section className="Projects__Container">
          <h2>Projects</h2>
          <div className="Projects">
            <Project />
          </div>
          <Link to="/add_project">Add New Project</Link>
        </section>
      </div>
    );
  }
}

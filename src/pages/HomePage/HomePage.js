import React, { Component } from "react";
import Context from "../../Context";
import Projects from "../../components/Projects/Projects";
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

  componentWillUnmount() {
    this.context.setProjectSubmissionSuccess(false);
    this.context.setDeleteSuccessful(false);
  }

  render() {
    const {
      currentUser,
      projectSubmissionSuccess,
      deleteSuccessful,
    } = this.context;  
    return (
      
      <div className="Home__Page">
        {projectSubmissionSuccess ? (
          <div className="Project__Success">Project Saved!</div>
        ) : deleteSuccessful ? (
          <div className="Delete__Success">Project Deleted!</div>
        ) : (
          ""
        )}
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
            {currentUser.full_name
              ? HelperFunctions.capitalCaseName(currentUser.full_name, " ")
              : ""}
            !
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
          {this.state.editModeEnabled ? (
            <button
              onClick={() => this.handleEditMode()}
              id="edit-btn"
              className="Edit__Button">
              Finished Editing
            </button>
          ) : (
            <button
              onClick={() => this.handleEditMode()}
              id="edit-btn"
              className="Edit__Button">
              Edit
            </button>
          )}
        </section>
        <section className="Profile__Details__Container">
          <h2>Biography</h2>
          <hr className="Header__Underline" />
          <EditableUserInfo
            editModeEnabled={this.state.editModeEnabled}
            currentUserInfo={`biography: ${currentUser.biography}`}
            {...this.props}
          />
        </section>
        <section className="Projects__Container">
          <h2>Projects</h2>
          <hr className="Header__Underline" />
          <div className="Projects">
            <Projects ownerId={currentUser.id} />
          </div>
          <Link to="/add_project">Add New Project</Link>
        </section>
      </div>
    );
  }
}

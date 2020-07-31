import React, { Component } from "react";
import Context from "../../Context";
import UserApiService from "../../services/user-api-service";
import Project from "../../components/Project/Project";
import EditableUserInfo from "../../components/EditableUserInfo/EditableUserInfo";
import { Link } from "react-router-dom";
import HelperFunctions from "../../utils/js/helpers";

export default class HomePage extends Component {
  state = {
    user: "",
  };
  static contextType = Context;

  componentDidMount() {
    const userId = this.context.currentUser.user_id;
    UserApiService.getUserById(userId).then((data) =>
      this.setState({ user: data })
    );
  }

  render() {
    const { user } = this.state;
    return (
      <div className="Home__Page">
        <section className="Profile__Header__Container">
          <h1 id="User__Logo">
            {typeof user.full_name === "string"
              ? HelperFunctions.createUserLogo(user.full_name)
              : ""}
          </h1>
          <h2>{user ? HelperFunctions.capitalCaseName(user.full_name) : ""}</h2>
          <EditableUserInfo
            currentUserInfo={`email: ${user.email}`}
            {...this.props}
          />
          <EditableUserInfo
            currentUserInfo={`university_affiliaton: ${user.university_affiliation}`}
            {...this.props}
          />
          <EditableUserInfo
            currentUserInfo={`academic_level: ${user.academic_level}`}
            {...this.props}
          />
        </section>
        <section className="Profile__Details__Container">
          <h2>Biography</h2>
          <EditableUserInfo currentUserInfo={`bio: ${user.biography}`} />
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

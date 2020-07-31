import React, { Component } from "react";
import { Link } from "react-router-dom";
import Project from "../../components/Project/Project";
import "./UserAccount.scss";
import EditableUserInfo from "../../components/EditableUserInfo/EditableUserInfo";
import Navbar from "../../components/Navbar/Navbar";
import Context from "../../Context";
import UserApiService from "../../services/user-api-service";

export default class UserAccount extends Component {
  static defaultProps = { match: { params: {} } };

  static contextType = Context;

  componentDidMount() {}

  render() {
    return (
      <>
        {/* <Navbar {...this.props}/>
        <div className="User__Account">
          <section className="Profile__Header__Container">
            <h1 id="User__Logo">
              {typeof currentUser.name === "string"
                ? currentUser.name.slice(0, 1)
                : ""}
            </h1>
            <h2>{currentUser.name}</h2>
            <EditableUserInfo
              currentUserInfo={`email: ${currentUser.email}`}
              {...this.props}
            /> */}
        {/* <EditableUserInfo
              currentUserInfo={`email: ${currentUser.email}`}
              {...this.props}
            />
            <EditableUserInfo
              currentUserInfo={`email: ${currentUser.email}`}
              {...this.props}
            />
            <EditableUserInfo
              currentUserInfo={`email: ${currentUser.email}`}
              {...this.props}
            /> */}
        {/* </section>

          <section className="Profile__Details__Container">
            <h2>Biography</h2>
            <EditableUserInfo currentUserInfo={`bio: this is my bio`}/>
          </section>
          <section className="Projects__Container">
            <h2>Projects</h2>
            <div className="Projects">
              <Project />
            </div>
            <Link to="/add_project">Add New Project</Link>
          </section>
        </div> */}
      </>
    );
  }
}

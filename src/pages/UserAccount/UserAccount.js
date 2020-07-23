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

  componentDidMount() {
    const userId = this.props.match.params.userId;
    UserApiService.getUser(userId).then((data) => this.context.setUser(data));
  }

  componentWillUnmount() {
    this.context.clearUser();
  }

  render() {
    const { currentUser } = this.context;
    return (
      <>
        <Navbar />
        <div className="User__Account">
          <section className="Profile__Header__Container">
            <h1 id="User__Logo">
              {typeof currentUser.name === "string"
                ? currentUser.name.slice(0, 1)
                : ""}
            </h1>
            <h2>{currentUser.name}</h2>
            <EditableUserInfo userInfo={currentUser.email} />
            <EditableUserInfo userInfo={currentUser.phone} />
            <EditableUserInfo userInfo={currentUser.website} />
            <EditableUserInfo userInfo={currentUser.username} />
          </section>

          <section className="Profile__Details__Container">
            <h2>Biography</h2>
            <EditableUserInfo />
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

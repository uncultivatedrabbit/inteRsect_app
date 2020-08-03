import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Context from "../../Context";
import ProjectApiService from "../../services/project-api-service";
import TokenService from "../../services/token-service";
import UserApiService from "../../services/user-api-service";
import parseJwt from "../../utils/js/parseJwt";

export default class ProjectPage extends Component {
  static defaultProps = { match: { params: {} } };

  static contextType = Context;

  verifyUserLoggedIn() {
    const token = TokenService.getAuthToken();
    if (!token) {
      this.context.setIsLoggedIn(false);
    } else {
      const { user_id } = parseJwt(token);
      this.context.setIsLoggedIn(true);
      UserApiService.getUserById(user_id).then((data) => {
        this.context.setUser(data);
      });
    }
  }

  componentDidMount() {
    this.verifyUserLoggedIn();
    const { projectId } = this.props.match.params;
    ProjectApiService.getProjectById(projectId).then((data) => {
      this.context.setCurrentPage(data);
    });
  }

  render() {
    const { currentPage } = this.context;

    return (
      <>
        <Navbar {...this.props} />
        <section className="Project__Page">
          <h2>{currentPage.title}</h2>
          <hr className="Header__Underline" />
          <h3>
            Principle Investigator:{" "}
            {currentPage.user ? currentPage.user.full_name : ""}
          </h3>
          <p>
            Internal Review Board Status:{" "}
            <span className="IRB__Pill">{currentPage.irbstatus}</span>
          </p>
          <p>Summary: {currentPage.summary}</p>
          <p>Support Needed: {currentPage.support_needed}</p>
        </section>
      </>
    );
  }
}

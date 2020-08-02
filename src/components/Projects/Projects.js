import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectApiService from "../../services/project-api-service";
import "./Projects.scss";
import Context from "../../Context";
import TokenService from "../../services/token-service";
import parseJwt from "../../utils/js/parseJwt";
import UserApiService from "../../services/user-api-service";

export default class Project extends Component {
  static defaultProps = {
    match: { params: {} },
  };

  static contextType = Context;

  componentDidMount() {
    this.verifyUserLoggedIn();
  }
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

  renderProjects() {
    console.log(this.props.ownerId)
   ProjectApiService.getProjectsByOwnerId();
  }

  render() {
    return <>{this.renderProjects()}</>;
  }
}

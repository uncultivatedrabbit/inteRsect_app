import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectApiService from "../../services/project-api-service";
import "./Projects.scss";
import Context from "../../Context";
import TokenService from "../../services/token-service";
import parseJwt from "../../utils/js/parseJwt";
import UserApiService from "../../services/user-api-service";


export default class Project extends Component {
  state = {
    projects: "",
  };
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
        this.handleGetProjects();
      });
    }
  }

  handleGetProjects() {
    const ownerId = this.props.ownerId;
    if (ownerId) {
      ProjectApiService.getProjectsByOwnerId(ownerId)
        .then((projects) => {
          this.setState({ projects: projects });
        })
        .catch((error) => {
          return false;
        });
    } else {
      this.context.setError("This page doesn't exist")
    }
  }

  renderProjects = () => {
    const { projects } = this.state;
    if (projects) {
      return projects.map((project, i) => {
        return (
          <div className="Project__Tile" key={project.title + i}>
            <h2>{project.title}</h2>
            <p>
              {project.medical_subspecialty.length > 1 ? (
                <>
                  <span className="Specialty__Pill">
                    {project.medical_specialty}{" "}
                  </span>
                  <span className="Specialty__Pill">
                    {project.medical_subspecialty}
                  </span>
                </>
              ) : (
                <>
                  <span className="Specialty__Pill">
                    {project.medical_specialty}{" "}
                  </span>
                </>
              )}
            </p>
            <Link to={`/project/${project.id}`}>Read More</Link>
          </div>
        );
      });
    }
  };

  render() {
    return <>{this.renderProjects()}</>;
  }
}

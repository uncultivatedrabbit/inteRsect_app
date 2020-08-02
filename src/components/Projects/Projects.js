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

  componentWillUnmount() {}

  renderProjects() {
    console.log(this.context.currentUser.id)
    // FAKE PROJECTS TO SIMULATE GETTING PROJECTS
    const projects = ProjectApiService.getProjectsByAuthorId();
    // return projects.map((project) => {
    //   return (
    //     <div key={Math.random() * 11} className="Project">
    //       <Link to={`/project/${project.id}`}>
    //         <h3>{project.title} </h3>
    //       </Link>
    //       {/* checks if the author array is greather than one
    //       and only does the loop if there is more than one author */}
    //       {project.authors.length > 1 ? (
    //         <p>
    //           {project.authors.map((author) => (
    //             <span key={Math.random() * 11}>{author} </span>
    //           ))}
    //         </p>
    //       ) : (
    //         <p>{project.authors[0]}</p>
    //       )}

    //       <p>Topics:</p>
    //       <ul>
    //         {project.topics.map((topic) => (
    //           <li key={-Math.random() * 10}>{topic}</li>
    //         ))}
    //       </ul>
    //     </div>
    // );
    // });
  }

  render() {
    return <>{this.renderProjects()}</>;
  }
}

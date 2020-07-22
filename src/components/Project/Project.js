import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectContext from "../../contexts/ProjectContext";
import ProjectApiService from "../../services/project-api-service";
import "./Project.scss";

export default class Project extends Component {
  static defaultProps = {
    match: { params: {} },
  };
  static contextType = ProjectContext;

  componentDidMount() {
    this.context.clearError();
  }

  componentWillUnmount() {
    this.context.clearProject();
  }

  renderProjects() {
    // FAKE PROJECTS TO SIMULATE GETTING PROJECTS
    const projects = ProjectApiService.getProjectsByAuthor("fakeAuthor");
    return projects.map((project) => {
      return (
        <div className="Project">
          <Link to={`/project/${project.id}`}>
            <h3>{project.title} </h3>
          </Link>
          {/* checks if the author array is greather than one 
          and only does the loop if there is more than one author */}
          {project.authors.length > 1 ? (
            <p>
              {project.authors.map((author) => (
                <span key={author}>{author} </span>
              ))}
            </p>
          ) : (
            <p>{project.authors[0]}</p>
          )}

          <p>Topics:</p>
          <ul>
            {project.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      );
    });
  }

  render() {
    return <>{this.renderProjects()}</>;
  }
}

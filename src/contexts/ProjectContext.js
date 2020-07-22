import React, { Component } from "react";

export const nullProject = {
  author: {},
  topics: [],
};

const ProjectContext = React.createContext({
  project: nullProject,
  comments: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setProject: () => {},
  clearProject: () => {},
  setComments: () => {},
  addComment: () => {},
});

export default ProjectContext;

export class ProjectProvider extends Component {
  state = {
    project: nullProject,
    error: null,
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setProject = (project) => {
    this.setProject({ project });
  };

  setComments = (comments) => {
    this.setState({ comments });
  };

  clearProject = () => {
    this.setProject(nullProject);
    this.setComments([]);
  };

  addComment = (comment) => {
    this.setComments([...this.state.comments, comment]);
  };

  render() {
    const value = {
      project: this.state.project,
      comments: this.state.comments,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setProject: this.setProject,
      clearProject: this.clearProject,
      addComment: this.addComment,
      setComments: this.setComments,
    };
    return (
      <ProjectContext.Provider value={value}>
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}

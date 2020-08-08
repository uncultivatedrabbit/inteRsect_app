import React, { Component } from "react";
import Context from "../../Context";
import ProjectApiService from "../../services/project-api-service";

export default class AddCommentForm extends Component {
  static contextType = Context;

  state = {
    comment: "",
    error: null,
  };
  handleChange(e) {
    const comment = e.target.value;
    this.setState({ comment: comment });
  }
  handleSubmit(e) {
    e.preventDefault();
    const projectId = this.context.currentPage.id;
    const submitterId = this.context.currentUser.id;
    const parentCommentOwnerId = null;
    const newComment = this.state.comment;
    ProjectApiService.postProjectComment({
      projectId,
      newComment,
      submitterId,
      parentCommentOwnerId,
    }).then((data) => {
      this.context.updateProjectComments(data)
    });
  }
  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <h2>Add a Comment:</h2>
          <textarea required onChange={(e) => this.handleChange(e)} />
          <input type="submit" />
        </form>
      </>
    );
  }
}

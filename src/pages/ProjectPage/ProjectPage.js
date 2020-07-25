import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Context from "../../Context";
import ProjectApiService from "../../services/project-api-service";
import PdfForm from "../../components/PdfForm/PdfForm";


export default class ProjectPage extends Component {
  state = {
    authorName: null,
  };
  static defaultProps = { match: { params: {} } };

  static contextType = Context;

  componentDidMount() {
    const { projectId } = this.props.match.params;
    ProjectApiService.getProject(projectId).then((data) => {
      this.context.setCurrentPage(data);
      this.getProjectAuthor(this.context.currentPage.userId);
    });
  }

  getProjectAuthor(authorId) {
    if (authorId) {
      ProjectApiService.getProjectAuthors(authorId).then((data) => {
        this.setState({ authorName: data.name });
      });
    }
  }

  componentWillUnmount() {
    this.context.clearCurrentPage();
  }

  render() {
    const { currentPage } = this.context;
    return (
      <>
        <Navbar />
        <section className="Project__Page">
          <h1>Project Title {currentPage.title}</h1>
          <hr />
          <h2>Principle Investigator: {this.state.authorName}</h2>
          <p>Internal Review Board Status: IRB Accepted</p>
          <p>Synopsis:</p>
          <p>{currentPage.body}</p>
          <h2>Upload Full Text as PDF</h2>
          <PdfForm />
        </section>
      </>
    );
  }
}

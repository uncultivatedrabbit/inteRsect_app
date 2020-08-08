import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Context from "../../Context";
import ProjectApiService from "../../services/project-api-service";
import TokenService from "../../services/token-service";
import UserApiService from "../../services/user-api-service";
import parseJwt from "../../utils/js/parseJwt";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import HelperFunctions from "../../utils/js/helpers";
import Comments from "../../components/Comments/Comments";
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";
import "./ProjectPage.scss";

export default class ProjectPage extends Component {
  state = {
    error: "",
    projectComments: "",
  };
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

  handleDelete(id) {
    ProjectApiService.deleteProject(id).then(() => {
      this.context.setDeleteSuccessful(true);
      this.props.history.push("/");
    });
  }

  handleEdit() {
    console.log("edit");
  }

  componentDidMount() {
    this.verifyUserLoggedIn();
    const { projectId } = this.props.match.params;
    ProjectApiService.getProjectById(projectId)
      .then((data) => {
        this.context.setCurrentPage(data);
      })
      .catch((err) =>
        this.setState({ error: "Sorry, that page doesn't exist!" })
      );
    ProjectApiService.getProjectComments(projectId).then((data) =>
      this.context.setProjectComments({ projectComments: data })
    );
  }

  render() {
    const { currentPage, currentUser } = this.context;
    const { error } = this.state;
    return (
      <>
        <Navbar {...this.props} />
        <section className="Project__Page">
          {error ? (
            <ErrorMessage error={error} />
          ) : (
            <>
              <header>
                {currentPage.owner ? (
                  currentPage.owner.id === currentUser.id ? (
                    <div className="Edit__Buttons">
                      <button onClick={() => this.handleEdit(currentPage.id)}>
                        Edit
                      </button>
                      <button onClick={() => this.handleDelete(currentPage.id)}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                <h2>{currentPage.title}</h2>
                <hr className="Header__Underline" />
              </header>
              <div className="Main">
                <h3>
                  Principle Investigator:{" "}
                  {currentPage.owner
                    ? HelperFunctions.capitalCaseName(
                        currentPage.owner.full_name,
                        " "
                      )
                    : ""}
                </h3>

                <h3>
                  <span className="Title">IRB Status: </span>
                  <span className={`IRB__Pill ${currentPage.irbstatus}`}>
                    {currentPage.irbstatus}
                  </span>
                </h3>
                <h3>
                  <span className="Title">Summary</span>
                </h3>
                <hr />
                <p>{currentPage.summary}</p>
                <h3>
                  <span className="Title">Support Needed</span>
                </h3>
                <hr />
                <p>{currentPage.support_needed}</p>
                <div className="Comment__Section">
                  <h2>Comments</h2>
                  <hr />
                  <Comments />
                  {currentPage.owner ? (
                    currentPage.owner.id !== currentUser.id ? (
                      <AddCommentForm />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </>
    );
  }
}

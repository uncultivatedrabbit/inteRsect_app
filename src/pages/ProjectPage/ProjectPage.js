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

export default class ProjectPage extends Component {
  state = {
    error: "",
    projectComments: '',
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
    const { error} = this.state;
    return (
      <>
        <Navbar {...this.props} />
        <section className="Project__Page">
          {error ? (
            <ErrorMessage error={error} />
          ) : (
            <>
              {currentPage.owner ? (
                currentPage.owner.id === currentUser.id ? (
                  <>
                    <button onClick={() => this.handleEdit(currentPage.id)}>
                      Edit
                    </button>
                    <button onClick={() => this.handleDelete(currentPage.id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <h2>{currentPage.title}</h2>
              <hr className="Header__Underline" />
              <h3>
                Principle Investigator:{" "}
                {currentPage.owner
                  ? HelperFunctions.capitalCaseName(
                      currentPage.owner.full_name,
                      " "
                    )
                  : ""}
              </h3>
              <p>
                Internal Review Board Status:{" "}
                <span className="IRB__Pill">{currentPage.irbstatus}</span>
              </p>
              <p>Summary: {currentPage.summary}</p>
              <p>Support Needed: {currentPage.support_needed}</p>
              <div className="Comment__Section">
                {currentPage.owner && currentPage.owner.id !== currentUser.id ? (
                  <form>Not My Project</form>
                ) : (
                  ""
                )}
                <Comments />
              </div>
            </>
          )}
        </section>
      </>
    );
  }
}

import React, { Component } from "react";
import Projects from "../../components/Projects/Projects";
import "./UserAccount.scss";
import Navbar from "../../components/Navbar/Navbar";
import Context from "../../Context";
import UserApiService from "../../services/user-api-service";

export default class UserAccount extends Component {
  state = {
    currentUserProfile: "",
    error: null,
  };
  static defaultProps = { match: { params: {} } };

  static contextType = Context;

  componentDidMount() {
    const userId = this.props.match.params.userId;

    UserApiService.getUserById(userId)
      .then((data) => {
        this.setState({ currentUserProfile: data });
      })
      .catch((error) => this.setState(error));
  }

  render() {
    const { currentUserProfile, error } = this.state;

    return (
      <>
        <Navbar {...this.props} />
        <div className="User__Account">
          {error ? (
            <h1>{error}</h1>
          ) : (
            <>
              <section className="Profile__Header__Container">
                <header>
                  <h1 id="User__Logo">
                    {typeof currentUserProfile.full_name === "string"
                      ? currentUserProfile.full_name.slice(0, 1).toUpperCase()
                      : ""}
                  </h1>
                  <h2>{currentUserProfile.full_name}</h2>
                </header>
                <div className="User__Info">
                  <p>
                    <span className="Category__Label">Email:</span>{" "}
                    {currentUserProfile.email}
                  </p>
                  <p>
                    <span className="Category__Label">
                      University Affiliation:{" "}
                    </span>
                    {currentUserProfile.university_affiliation}
                  </p>
                  <p>
                    <span className="Category__Label">Academic Level:</span>{" "}
                    {currentUserProfile.academic_level}
                  </p>
                </div>
              </section>
              <section className="Profile__Details__Container">
                <h2>Biography</h2>
                {currentUserProfile.biography}
              </section>
              <section className="Projects__Container">
                <h2>{currentUserProfile.full_name}'s Projects</h2>
                <div className="Projects">
                  <Projects ownerId={currentUserProfile.id} />
                </div>
              </section>
            </>
          )}
        </div>
      </>
    );
  }
}

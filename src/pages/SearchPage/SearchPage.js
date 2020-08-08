import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchPage.scss";
import ProjectService from "../../services/project-api-service";
import DropdownInput from "../../components/DropdownInput/DropdownInput";
import Context from "../../Context";
import TokenService from "../../services/token-service";
import parseJwt from "../../utils/js/parseJwt";
import UserApiService from "../../services/user-api-service";
import SubspecialtyDropdownInput from "../../components/SubspecialtyDropdownInput/SubspecialtyDropdownInput";
import { Link } from "react-router-dom";
import HelperFunctions from "../../utils/js/helpers";

export default class SearchPage extends Component {
  // initialize all the possible medical specialties as the global state object
  state = {
    filteredSpecialties: this.context.medicalSpecialties,
    searchResults: "",
    submitted: false,
  };

  static contextType = Context;

  componentDidMount() {
    this.verifyUserLoggedIn();
    this.context.setCurrentSpecialty("");
    this.context.setCurrentSubspecialty("");
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

  handleSubmit = (e) => {
    e.preventDefault();
    const specialty = this.context.currentSpecialty || "All";
    let subspecialty = this.context.currentSubspecialty || null;
    if (specialty === "All") {
      ProjectService.getAllProjects().then((results) =>
        this.setState({ searchResults: results, submitted: true })
      );
    } else {
      ProjectService.getProjectsBySpecialty(specialty, subspecialty).then(
        (results) => {
          this.setState({ searchResults: results, submitted: true });
        }
      );
    }
  };

  renderSearchResults() {
    const { searchResults } = this.state;
    if (searchResults.length < 1) {
      return (
        <div className="No__Results">Sorry No Projects On That Topic!</div>
      );
    }
    return searchResults.map((result, i) => {
      return (
        <section key={`${result.title}-${i}`} className="Project__Result">
          <Link to={`/project/${result.id}`}>{result.title}</Link>
          <p>
            Primary Researcher:{" "}
            {result.owner
              ? HelperFunctions.capitalCaseName(result.owner.full_name, " ")
              : ""}
          </p>
        </section>
      );
    });
  }

  render() {
    const { submitted } = this.state;
    return (
      <>
        <Navbar {...this.props} />
        <div className="SearchPage">
          <h1>Search Research Projects</h1>
          <section className="Search__Sidebar"></section>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="dropdown_selection">Medical Specialties:*</label>
            <DropdownInput required={true} includeAll={true} />
            <SubspecialtyDropdownInput addLabel={true} />
            <input type="submit" value="Search" />
          </form>
          <section className="Search__Results">
            {submitted ? this.renderSearchResults() : ""}
          </section>
        </div>
      </>
    );
  }
}

import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchPage.scss";
import AutocompleteInput from "../../components/AutocompleteInput/AutocompleteInput";
import ProjectService from "../../services/project-api-service";
import DropdownInput from "../../components/DropdownInput/DropdownInput";
import Context from "../../Context";
import TokenService from "../../services/token-service";
import parseJwt from "../../utils/js/parseJwt";
import UserApiService from "../../services/user-api-service";

export default class SearchPage extends Component {
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

  // initialize all the possible medical specialties as the global state object
  state = {
    filteredSpecialties: this.context.medicalSpecialties,
    updateFilteredSpecialties: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { filter_term, dropdown_selection } = e.target;
    ProjectService.getProjectsByTopic(
      filter_term.value,
      dropdown_selection.value
    );
  };

  render() {
    return (
      <>
        <Navbar {...this.props} />
        <div className="SearchPage">
          <h1>Search page</h1>
          <section className="Search__Sidebar"></section>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="Search__Bar">Search By Keyword</label>
            <AutocompleteInput
              medicalSpecialties={this.state.filteredSpecialties}
            />
            <label htmlFor="med__dropdown__selection">Specialties:</label>
            <DropdownInput includeAll={true} />
            <input type="submit" value="Search" />
          </form>
        </div>
      </>
    );
  }
}

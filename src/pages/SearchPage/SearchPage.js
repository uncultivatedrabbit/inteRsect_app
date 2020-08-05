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


export default class SearchPage extends Component {
  // initialize all the possible medical specialties as the global state object
  state = {
    filteredSpecialties: this.context.medicalSpecialties,
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

  handleSubmit = (e) => {
    e.preventDefault();
    const specialty = this.context.currentSpecialty;
    let subspecialty = this.context.currentSubspecialty || null;
    if (specialty === "All") {
      ProjectService.getAllProjects().then(data => console.log(data));
    } else {
      ProjectService.getProjectsByTopic(specialty, subspecialty);
    }
  };

  render() {
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
          <section className="Search__Results"></section>
        </div>
      </>
    );
  }
}

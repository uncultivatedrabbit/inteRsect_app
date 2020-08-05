import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProjectApiService from "../../services/project-api-service";
import "./AddProjectPage.scss";
import Context from "../../Context";
import DropdownInput from "../../components/DropdownInput/DropdownInput";
import TokenService from "../../services/token-service";
import parseJwt from "../../utils/js/parseJwt";
import UserApiService from "../../services/user-api-service";
import SubspecialtyDropdownInput from "../../components/SubspecialtyDropdownInput/SubspecialtyDropdownInput";

export default class AddProjectPage extends Component {
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

  /**
   * @function handles submit form
   * and sends the project data to the API service
   * to be POSTed into the DB
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.context.currentUser;
    const {
      title,
      summary,
      support_needed,
      dropdown_selection,
      IRB__Status,
      subspecialties,
    } = e.target;
    if (!subspecialties) {
      ProjectApiService.postProject({
        owner_id: id,
        title: title.value,
        summary: summary.value,
        IrbStatus: IRB__Status.value,
        specialty: dropdown_selection.value,
        subspecialty: null,
        support_needed: support_needed.value,
      });
    } else {
      ProjectApiService.postProject({
        owner_id: id,
        title: title.value,
        summary: summary.value,
        IrbStatus: IRB__Status.value,
        specialty: dropdown_selection.value,
        subspecialty: subspecialties.value,
        support_needed: support_needed.value,
      });
    }
    this.context.setProjectSubmissionSuccess(true);
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <Navbar {...this.props} />
        <div className="AddProjectPage">
          <h1>Add New Medical Research Project</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="New__Proj__Title">Title*</label>
            <input type="text" name="title" required id="New__Proj__Title" />
            <label htmlFor="New__Proj__Summary">Summary*</label>
            <textarea
              name="summary"
              required
              defaultValue={""}
              id="New__Proj__Summary"
            />
            <label htmlFor="New__Proj__Support">Support Needed*</label>
            <textarea
              name="support_needed"
              required
              defaultValue={
                "Let people know what kind of support this project needs"
              }
              id="New__Proj__Support"
            />
            <label htmlFor="New__Proj__Medical_Specialties">Specialties*</label>
            <DropdownInput required={true} />
            <SubspecialtyDropdownInput />
            <label htmlFor="IRB__Status">IRB Status*</label>
            <select required name="IRB__Status">
              <option value="">--------</option>
              <option value="Need to Apply">Need to Apply</option>
              <option value="Submitted">Submitted</option>
              <option value="Accepted">Accepted</option>
              <option value="Excempt">Exempt</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </>
    );
  }
}

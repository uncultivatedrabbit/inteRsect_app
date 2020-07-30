import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProjectApiService from "../../services/project-api-service";
import "./AddProjectPage.scss";
import Context from "../../Context";
import DropdownInput from "../../components/DropdownInput/DropdownInput";
import MedicalSpecialties from "../../utils/js/MedicalSpecialties/MedialSpecialties";

export default class AddProjectPage extends Component {
  static contextType = Context;

  /**
   * @function dynamically renders subspecialties
   * depending on user input for specialty dropdown input
   * by checking against list of medical specialties in context
   */
  handleRenderSubspecialtyMenu() {
    const selectedSpecialty = this.context.currentSpecialty;
    if (selectedSpecialty) {
      return MedicalSpecialties.map((specialty, index) => {
        if (
          selectedSpecialty === Object.keys(specialty)[0] &&
          Object.values(specialty)[0] !== null
        ) {
          const subspecialties = Object.values(specialty)[0];
          return (
            <React.Fragment key={specialty + index}>
              <label htmlFor="subspecialties">Subspecialty:</label>
              <select name="subspecialties" id="Subspecialties">
                <option key={"none"} value="">
                  ----------
                </option>
                {subspecialties.map((sub, i) => (
                  <option key={i + 1} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </React.Fragment>
          );
        }
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
    const {
      title,
      summary,
      dropdown_selection,
      IRB__Status,
      subspecialties,
    } = e.target;
    ProjectApiService.postProject({
      title: title.value,
      summary: summary.value,
      IrbStatus: IRB__Status.value,
      specialty: dropdown_selection.value,
      subspecialty: subspecialties.value || null,
    });
  };
  render() {
    return (
      <>
        <Navbar />
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
            <label htmlFor="New__Proj__Medical_Specialties">Specialties*</label>
            <DropdownInput />
            {this.handleRenderSubspecialtyMenu()}
            <label htmlFor="IRB__Status">IRB Status*</label>
            <select name="IRB__Status">
              <option value="">--------</option>
              <option value="accepted">Need to Apply</option>
              <option value="accepted">Submitted</option>
              <option value="accepted">Accepted</option>
              <option value="accepted">Exempt</option>
            </select>
            <label htmlFor="New__Proj__File">Full Manuscript</label>
            <input type="file" accept=".pdf" name="file" id="New__Proj__File" />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </>
    );
  }
}

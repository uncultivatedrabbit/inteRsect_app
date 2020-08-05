import React, { Component } from "react";
import Context from "../../Context";

export default class SubspecialtyDropdownInput extends Component {
  static contextType = Context;

   /**
   * @method keeps track of which subspecialty the user is currently on
   * and updates context accordingly
   */
  handleChange = (e) => {
    const subspecialty = e.target.value;
    this.context.setCurrentSubspecialty(subspecialty);
  };

  /**
   * @method dynamically renders subspecialties
   * depending on user input for specialty dropdown input
   * by checking against list of medical specialties in context
   */
  handleRenderSubspecialtyMenu() {
    const MedicalSpecialties = this.context.medicalSpecialties;
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
              <label htmlFor="subspecialties">Subspecialties:</label>
              <select onChange={this.handleChange} name="subspecialties" id="Subspecialties">
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
        return false;
      });
    }
  }
  render() {
    return <>{this.handleRenderSubspecialtyMenu()}</>;
  }
}

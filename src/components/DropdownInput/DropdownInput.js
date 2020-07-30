import React, { Component } from "react";
import Context from "../../Context";

export default class DropdownInput extends Component {
  static contextType = Context;

  /**
   * @function keeps track of which specialty the user is currently on
   * and updates context accordingly
   */
  handleChange = (e) => {
    const specialty = e.target.value;
    this.context.setCurrentSpecialty(specialty);
  };

  /**
   * @function gets the medical specialties from context
   * and creates a dropdown option list using the keys for
   * each specialty
   */
  renderTopics = () => {
    const { medicalSpecialties } = this.context;
    return medicalSpecialties.map((specialty) => {
      return (
        <option key={Object.keys(specialty)} value={Object.keys(specialty)}>
          {Object.keys(specialty)}
        </option>
      );
    });
  };
  render() {
    return (
      <select
        onChange={this.handleChange}
        id="dropdown_selection"
        name="dropdown_selection">
        {this.props.includeAll ? (
          <option value="All">--------All---------</option>
        ) : (
          <option value="">--------------------</option>
        )}
        {this.renderTopics()}
      </select>
    );
  }
}

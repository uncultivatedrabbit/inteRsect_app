import React, { Component } from "react";
import Context from "../../Context";

export default class DropdownInput extends Component {
  static contextType = Context;

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
      <select id="dropdown_selection" name="dropdown_selection">
        <option value="All">-----All-----</option>
        {this.renderTopics()}
      </select>
    );
  }
}

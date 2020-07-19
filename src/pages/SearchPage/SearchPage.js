import React, { Component } from "react";
import MedicalSpecialties from "../../utils/js/MedicalSpecialties/MedialSpecialties";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchPage.scss";
import Autocomplete from "../../components/Autocomplete/Autocomplete";

export default class SearchPage extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="SearchPage">
          <h1>Search page</h1>
          <section className="Search__Sidebar">
            <h2>Filter by speciality</h2>
          </section>
          <form>
            <label htmlFor="Search__Bar"></label>
            <Autocomplete suggestions={MedicalSpecialties}/>
            <input type="submit" value="Search" />
          </form>
        </div>
      </>
    );
  }
}

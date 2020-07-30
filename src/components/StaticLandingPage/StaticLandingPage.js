import React, { Component } from "react";
import { Link } from "react-router-dom";
import MedicalSpecialties from "../../utils/js/MedicalSpecialties/MedialSpecialties";

export default class StaticLandingPage extends Component {
  state = {
    medicalspecialties: MedicalSpecialties,
  };

  renderMedicalSpecialtyPills() {
    const specialties = this.state.medicalspecialties;
    return specialties.map((specialty, i) => {
      return (
        <p className="pill" key={i}>
          {Object.keys(specialty)[0]}
        </p>
      );
    });
  }

  render() {
    return (
      <div className="Landing__Page">
        <section className="Landing__Hero">
          <h2>Bringing research teams together</h2>
          <Link to="/register">Register Now</Link>
        </section>
        <section className="Landing__About">
          <h2>Get your projects off the ground</h2>
          <p>
            Share your own research, find projects and opportunities for
            collaboration, and ensure you have the support you need to expand
            knowledge in your field.
          </p>
        </section>
        <section className="Landing__Topics">
          <h2>Research with a focus on medical fields</h2>
          {this.renderMedicalSpecialtyPills()}
        </section>
      </div>
    );
  }
}

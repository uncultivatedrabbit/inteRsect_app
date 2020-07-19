import React from "react";
import { Link } from "react-router-dom";
import "./Project.scss";

export default function Project() {
  return (
    <div className="Project">
      <Link to="/userAccount/1/project/1">
        <h3>Super Important Medical Research </h3>
      </Link>
      <p>Topics </p>
      <ul>
        <li>Family Medicine</li>
        <li>General Surgery</li>
      </ul>
    </div>
  );
}

import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProjectApiService from "../../services/project-api-service";

export default function AddProjectPage() {
  function handleSubmit(e) {
    e.preventDefault();
    const { title, summary } = e.target;
    ProjectApiService.postProject({
      title: title.value,
      summary: summary.value,
    });
  }
  return (
    <>
      <Navbar />
      <h1>Add New Medical Research Project</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="New__Proj__Title">Title:</label>
        <input type="text" name="title" required id="New__Proj__Title" />
        <label htmlFor="New__Proj__Summary">Summary:</label>
        <input type="text" name="summary" required id="New__Proj__Summary" />
        <label htmlFor="New__Proj__File">Full Manuscript:</label>
        <input type="file" accept=".pdf" name="file" id="New__Proj__File" />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

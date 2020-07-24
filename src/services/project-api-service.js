import config from "../config";

const ProjectApiService = {
  getAllProjects() {},
  getProjectsByTopic(filterTerm, dropdownTerm) {
    console.log(filterTerm, dropdownTerm);
  },
  getProjectsByAuthor(author) {
    return [
      {
        id: 1,
        title: "Best Project Ever!",
        authors: ["Homer Simpson", "Lisa Simpson"],
        topics: ["Pain Medicine", "Dermatology"],
        projectBlurb:
          "This project is intended to be amazing, and if it isn't by god what the hell are we doing!",
      },
      {
        id: 2,
        title: "Worst Project Ever!",
        authors: ["Maggie Simpson"],
        topics: ["Family Medicine", "General Surgery"],
        projectBlurb:
          "This project is intended to be aweful, and if it isn't by god what the hell are we doing!",
      },
    ];
  },
  getProject(projectId) {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts/${projectId}`
    ).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getProjectAuthors(projectAuthorId) {
    return fetch(
      `https://jsonplaceholder.typicode.com/users/${projectAuthorId}`
    ).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getProjectComments(projectId) {},
  postProject(project) {
    console.log(project);
  },
  postComment(projectId, text, author) {},
};

export default ProjectApiService;

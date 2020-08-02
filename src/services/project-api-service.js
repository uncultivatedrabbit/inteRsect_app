import config from "../config";

const ProjectApiService = {
  getAllProjects() {},
  getProjectsByTopic(filterTerm, dropdownTerm) {
    console.log(filterTerm, dropdownTerm);
  },
  getProjectsByOwnerId(authorId) {
   
  },
  getProjectById(projectId) {
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
    return fetch(`${config.API_ENDPOINT}/api/projects`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  postComment(projectId, text, author) {},
};

export default ProjectApiService;

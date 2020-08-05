import config from "../config";

const ProjectApiService = {
  getAllProjects() {
    return fetch(`${config.API_ENDPOINT}/api/projects/`).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getProjectsBySpecialty(specialty, subspecialty) {
    let params;
    if (subspecialty !== null) {
      params = {
        medical_specialty: specialty,
        medical_subspecialty: subspecialty,
      };
    } else {
      params = {
        medical_specialty: specialty,
      };
    }
    return fetch(
      `${config.API_ENDPOINT}/api/projects/search?` +
        new URLSearchParams(params)
    ).then((res) => {
      if (!res.ok) {
        console.log(res)
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getProjectsByOwnerId(ownerId) {
    return fetch(`${config.API_ENDPOINT}/api/users/${ownerId}/projects`).then(
      (res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        } else {
          return res.json();
        }
      }
    );
  },
  getProjectById(projectId) {
    return fetch(`${config.API_ENDPOINT}/api/projects/${projectId}`).then(
      (res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        } else {
          return res.json();
        }
      }
    );
  },
  getProjectAuthors(projectAuthorId) {},
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

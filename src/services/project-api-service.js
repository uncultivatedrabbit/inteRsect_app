import config from "../config";
import TokenService from "./token-service";

const ProjectApiService = {
  getAllProjects() {
    return fetch(`${config.API_ENDPOINT}/api/projects/`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
    }).then((res) => {
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
        new URLSearchParams(params),
      {
        headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
      }
    ).then((res) => {
      if (!res.ok) {
        console.log(res);
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getProjectsByOwnerId(ownerId) {
    return fetch(`${config.API_ENDPOINT}/api/users/${ownerId}/projects`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getProjectById(projectId) {
    return fetch(`${config.API_ENDPOINT}/api/projects/${projectId}`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getProjectComments(projectId) {
    return fetch(`${config.API_ENDPOINT}/api/projects/${projectId}/comments`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  postProject(project) {
    return fetch(`${config.API_ENDPOINT}/api/projects`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
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
  deleteProject(projectId) {
    return fetch(`${config.API_ENDPOINT}/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
};

export default ProjectApiService;

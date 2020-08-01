import config from "../config";
import TokenService from "./token-service";

const UserApiService = {
  getAllUsers() {},
  getUserById(userId) {
    return fetch(`${config.API_ENDPOINT}/api/users/${userId}`, {
      headers: {
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
  getUserProjects(userId) {},
  updateUser(userId, category, updatedInfo) {
    return fetch(`${config.API_ENDPOINT}/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        id: userId,
        [category]: updatedInfo
      })
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
};

export default UserApiService;

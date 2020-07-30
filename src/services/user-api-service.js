import config from "../config";

const UserApiService = {
  getAllUsers() {},
  getUser(userId) {
    return fetch(`${config.API_ENDPOINT}/users/${userId}`).then(
      (res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        } else {
          return res.json();
        }
      }
    );
  },
  getUserProjects(userId) {},
  updateUser(userId, category, updatedInfo) {
    // console.log(userId, category, updatedInfo);
  },
};

export default UserApiService;

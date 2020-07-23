import config from "../config";

const UserApiService = {
  getAllUsers() {},
  getUser(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        } else {
          return res.json();
        }
      })
  },
  getUserProjects(userId) {},
};

export default UserApiService;

import config from "../config";

const AuthApiService = {
  postUser(user) {
    console.log(user);
  },
  postLogin(credentials) {
    console.log(credentials);
  },
  postRefreshToken() {},
};

export default AuthApiService;

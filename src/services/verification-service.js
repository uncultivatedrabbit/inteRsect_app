const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const VerificationService = {
  verifyPasswordsMatch(password, match) {
    return password === match;
  },
  verifyValidPassword(password) {
    if (password.length < 8) {
      return "Password must be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password must be shorter than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password can't start or end with empty space";
    }
    if (!regex.test(password)) {
      return "Password must contain 1 upper case, lower case, number and special character";
    }
    return "Valid Password";
  },
};

export default VerificationService;

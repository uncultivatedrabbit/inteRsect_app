const VerificationService = {
  verifyPasswordsMatch(password, match) {
    return password === match;
  },
};

export default VerificationService;



const HelperFunctions = {
  capitalCaseName(name, splitByChar) {
    return name
      .split(splitByChar)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },
  createUserLogo(name) {
    return name.slice(0, 1).toUpperCase();
  },
};

export default HelperFunctions;

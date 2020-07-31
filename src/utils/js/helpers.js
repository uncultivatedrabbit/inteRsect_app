const HelperFunctions = {
  capitalCaseName(name) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },
  createUserLogo(name) {
    return name.slice(0, 1).toUpperCase();
  },
};

export default HelperFunctions;

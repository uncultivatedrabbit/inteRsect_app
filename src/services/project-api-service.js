import config from "../config";

const ProjectApiService = {
  getAllProjects() {},
  getProjectsByAuthor(author){
    return [{
      id: 1,
      title: "Best Project Ever!",
      authors: ["Homer Simpson", "Lisa Simpson"],
      topics: ["Pain Medicine", "Dermatology"],
      projectBlurb:
        "This project is intended to be amazing, and if it isn't by god what the hell are we doing!",
    },
    {
      id: 2,
      title: "Worst Project Ever!",
      authors: ["Maggie Simpson"],
      topics: ["Family Medicine", "General Surgery"],
      projectBlurb:
        "This project is intended to be aweful, and if it isn't by god what the hell are we doing!",
    }];
  },
  getProject(projectId) {
    
  },
  getProjectComments(projectId) {},
  postComment(projectId, text, author) {},
};

export default ProjectApiService;

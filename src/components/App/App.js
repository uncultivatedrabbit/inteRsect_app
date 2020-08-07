import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Registration from "../../pages/Registration/Registration";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Login from "../../pages/Login/Login";
import UserAccount from "../../pages/UserAccount/UserAccount";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import SearchPage from "../../pages/SearchPage/SearchPage";
import ProjectPage from "../../pages/ProjectPage/ProjectPage";
import Context from "../../Context";
import AddProjectPage from "../../pages/AddProjectPage/AddProjectPage";
import MedicalSpecialties from "../../utils/js/MedicalSpecialties/MedialSpecialties";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicRoute from "../Utils/PublicRoute";

class App extends Component {
  state = {
    medicalSpecialties: MedicalSpecialties,
    isLoggedIn: false,
    currentUser: {},
    currentPage: {},
    currentSpecialty: "All",
    currentSubSpecialty: "",
    redirectedFromReg: false,
    projectSubmissionSuccess: false,
    deleteSuccessful: false,
    error: null,
    projectComments: '',
    setError: (error) => this.setState({ error: error }),
    setUser: (data) => this.setState({ currentUser: data }),
    clearUser: () => this.setState({ currentUser: {} }),
    setCurrentPage: (data) => this.setState({ currentPage: data }),
    clearCurrentPage: () => this.setState({ currentPage: {} }),
    setIsLoggedIn: (bool) => this.setState({ isLoggedIn: bool }),
    setCurrentSpecialty: (data) => this.setState({ currentSpecialty: data }),
    clearCurrentSpecialty: () => this.setState({ currentSpecialty: "" }),
    setCurrentSubspecialty: (data) =>
      this.setState({ currentSubspecialty: data }),
    clearCurrentSubspecialty: () => this.setState({ currentSubspecialty: "" }),
    setRedirectedFromReg: (bool) => this.setState({ redirectedFromReg: bool }),
    setDeleteSuccessful: (bool) => this.setState({ deleteSuccessful: bool }),
    setProjectSubmissionSuccess: (bool) =>
      this.setState({ projectSubmissionSuccess: bool }),
    updateUser: (category, data) => {
      this.setState({
        currentUser: {
          ...this.state.currentUser,
          [category]: data,
        },
      });
    },
    setProjectComments: (data) => this.setState({ projectComments: data }),
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute path="/user/:userId" component={UserAccount} />
            <PublicRoute path="/register" component={Registration} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/search" component={SearchPage} />
            <PrivateRoute path="/project/:projectId" component={ProjectPage} />
            <PrivateRoute path="/add_project" component={AddProjectPage} />
            <Route component={ErrorPage} />
          </Switch>
        </main>
      </Context.Provider>
    );
  }
}

export default App;

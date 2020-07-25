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

class App extends Component {
  state = {
    medicalSpecialties: MedicalSpecialties,
    isLoggedIn: false,
    currentUser: {},
    currentPage: {},
    currentSpecialty: '',
    setUser: (data) => this.setState({ currentUser: data }),
    clearUser: () => this.setState({ currentUser: {} }),
    setCurrentPage: (data) => this.setState({ currentPage: data }),
    clearCurrentPage: () => this.setState({ currentPage: {} }),
    setIsLoggedIn: () => this.setState({ isLoggedIn: true }),
    setCurrentSpecialty: (data) => this.setState({currentSpecialty: data}),
    clearCurrentSpecialty: () => this.setState({currentSpecialty: ''}),
    updateUser: (category, data) => {
      this.setState({
        currentUser: {
          ...this.state.currentUser,
          [category]: data,
        },
      });
    },
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/user/:userId" component={UserAccount} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={SearchPage} />
            <Route path="/project/:projectId" component={ProjectPage} />
            <Route path="/add_project" component={AddProjectPage} />
            <Route component={ErrorPage} />
          </Switch>
        </main>
      </Context.Provider>
    );
  }
}

export default App;

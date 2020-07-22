import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Registration from "../../pages/Registration/Registration";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Login from "../../pages/Login/Login";
import UserAccount from "../../pages/UserAccount/UserAccount";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import SearchPage from "../../pages/SearchPage/SearchPage";
import ProjectPage from '../../pages/ProjectPage/ProjectPage'

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/userAccount/:id" component={UserAccount} />
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={SearchPage} />
          <Route path="/project/:id" component={ProjectPage} />
          <Route component={ErrorPage} />
        </Switch>
      </main>
    );
  }
}

export default App;

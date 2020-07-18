import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Registration from "../../pages/Registration/Registration";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Login from "../../pages/Login/Login";
import UserAccount from "../../pages/UserAccount/UserAccount";

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/userAccount" component={UserAccount} />
          <Route path={"/register"} component={Registration} />
          <Route path="/login" component={Login} />
        </Switch>
      </main>
    );
  }
}

export default App;

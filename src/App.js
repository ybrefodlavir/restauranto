import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";
import { Login } from "./pages/Login";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/sukses" component={Sukses} exact />
            <Route path="/login" component={Login} exact />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";
import Login from "./pages/Login";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/home" element={<Home />} exact />
            <Route path="/sukses" element={<Sukses />} exact />
            <Route path="/" element={<Login />} exact />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

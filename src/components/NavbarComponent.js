import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation} from "react-router-dom";


import "../pages/Style/Navbar.css";

import { firebaseauth } from "../firebase/FirebaseAuth";
import {
  signOut,
} from "firebase/auth";

const NavbarComponent = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const logout = async () => {
    await signOut(firebaseauth);
    navigate("/", { from });
  };
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <strong>Restauranto</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <button onClick={logout} className="SignOut">Sign Out</button>
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

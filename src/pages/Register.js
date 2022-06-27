import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Auth
import { firebaseauth } from "../firebase/FirebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Style
import "./Style/Register.css";

// Assets

import GoogleLogo from "../Assets/Google Logo.png";

const RegisterPage = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const provider = new GoogleAuthProvider();

  let navigate = useNavigate();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // register Function
  const register = () => {
    try {
      const user = createUserWithEmailAndPassword(
        firebaseauth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      navigate("/home", { from });
    } catch (error) {
      console.log(error.message);
    }
  };
  const registerWithGoogle = () => {
    try {
      signInWithPopup(firebaseauth, provider).then((result) => {
        console.log(result);
        navigate("/home", { from });
      });
    } catch (error) {}
  };

  return (
    <div className="register-container">
      <div>
       
        <br />
        <div className="box-register-container">
          <h1>Register</h1>
          <form>
            <div className="form-group">
              <label>Email</label>
              <br />
              <input
                type="email"
                name="email"
                id="email-form"
                placeholder="Enter Your Email"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                id="password-form"
                placeholder="Enter Your Password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
              />
            </div>
            <button onClick={register} className="button-register">
              Register
            </button>
          </form>
          <hr />
          <p className="center-text">or</p>
          <button
            onClick={registerWithGoogle}
            className="google-button-register"
          >
            <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
            Register With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

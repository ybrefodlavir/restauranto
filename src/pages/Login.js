import React from "react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

// Auth
import { firebaseauth } from "../firebase/FirebaseAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Style
import "./Style/Login.css";

// Assets
import GoogleLogo from "../Assets/Google Logo.png";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  let navigate = useNavigate();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  onAuthStateChanged(firebaseauth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
  });

  // Login Function
  const loginProcess = () => {
    try {
      const user = signInWithEmailAndPassword(
        firebaseauth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      navigate("/home", { from });
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(firebaseauth);
    navigate("/", { from });
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
    <div className="login-container">
      <div>
        <button className="buttonsignout" onClick={logout}>
          Sign Out
        </button>
        <p>Sign In as </p>
        {user != null ? user.email : "Sign in First"}
        <br />
        <div className="box-login-container">
          <h1>Login</h1>
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
                  setLoginEmail(event.target.value);
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
                  setLoginPassword(event.target.value);
                }}
              />
            </div>
            <button onClick={loginProcess} className="button-login">
              Login
            </button>
          </form>
          <p className="small-text">
            Dont Have Account? <Link to="/register"> Register</Link>
          </p>
          <hr />
          <p className="center-text">or</p>
          <button onClick={registerWithGoogle} className="google-button-login">
            <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

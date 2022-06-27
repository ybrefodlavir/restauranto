import React from "react";
import { firebaseauth } from "../firebase/FirebaseAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import GoogleButton from "react-google-button";
//import { useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  //let navigate = useNavigate();
  //let location = useLocation();
  //let { from } = location.state || { from: { pathname: "/" } };

  onAuthStateChanged(firebaseauth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
  });

  const registerWithGoogle = () => {
    signInWithPopup(firebaseauth, provider).then((result) => {
      console.log(result);
    });
  };

  const handleRegister = () => {
    try {
      const user = createUserWithEmailAndPassword(
        firebaseauth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      alert("User created");
      //navigate("/", { from });
    } catch (error) {}
  };

  const handleLogin = () => {
    try {
      const user = signInWithEmailAndPassword(
        firebaseauth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      alert("User login");
      //navigate("/", { from });
    } catch (error) {}
  };

  const handleSignOut = () => {
    signOut(firebaseauth);
    alert("User sign out");
  };

  return (
    <div>
      <div>
        <input
          placeholder="Username"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        ></input>
        <input
          placeholder="Password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        ></input>
        <button onClick={handleRegister}>Register</button>
      </div>
      <div>
        <input
          placeholder="Username"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        ></input>
        <input
          placeholder="Password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        ></input>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <button onClick={handleSignOut}>Sign out</button>
        <p>Login as</p>
        {user != null ? user.email : "Sign in First"}
        <GoogleButton onClick={registerWithGoogle} />
      </div>
    </div>
  );
};

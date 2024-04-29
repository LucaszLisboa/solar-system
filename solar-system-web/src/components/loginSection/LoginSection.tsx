import React, { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import './LoginSection.css';

export default function LoginSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
  }

  return (
    <div className="loginSectionContainer">
      <h1>Sign in</h1>
      <h2>Welcome back</h2>
      <p>Please login to your account</p>
      <div>
        <form className="loginContainer">
          <input
            id="email"
            className="input"
            type="email"
            placeholder="Email"
            onChange={(e) => { setEmail(e.target.value) }}
            required
          />
          <input
            id="password"
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => { setPassword(e.target.value) }}
            required
          />
          <button
            className="loginButton"
            onClick={onLogin}
          >
            Sign in
          </button>
        </form>
        <p>Or login with</p>
        <div className="loginWithGoogle">
          <img className="logoGoogle" src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" />
          <p>Login with Google</p>
        </div>
        <p>
          Don't have an a account?
          <NavLink to="/signup">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
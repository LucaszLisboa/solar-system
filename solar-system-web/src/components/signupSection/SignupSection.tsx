import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './SignupSection.css';

export default function SignupSection() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <section>
      <div className="loginSectionContainer">
        <h1>Sign up</h1>
        <p>Please register your account</p>
        <form className="loginContainer">
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <button
            className="loginButton"
            type="submit"
            onClick={onSubmit}
          >
            Sigun up
          </button>
          <p>Already have an account?{''} <NavLink to="/">Sign in</NavLink></p>
        </form>
      </div>
    </section>
  );
}
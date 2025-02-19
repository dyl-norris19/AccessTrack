import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase";
import "./Register.css";
import { Header, Footer } from "../Template";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) history("/dashboard", { replace: true });
  }, [user, loading, history]);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header headerTitle={"Create an Account"} />
      <div className="register  flex-grow-1 d-flex">
        <div className="register__container">
          <label htmlFor="name" className="form-label">
            Full Name:
          </label>
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className="form-label">
            E-mail Address:
          </label>
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="register__btn" onClick={register}>
            Register
          </button>
          <div>
            Already have an account? <Link to="/login">Login now.</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

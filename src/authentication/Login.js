import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { Header, Footer } from "../Template";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header headerTitle={"Login"} />
      <div className="login flex-grow-1 d-flex">
        <div className="login__container">
          <label htmlFor="email" className="form-label">
            E-mail Address:
          </label>
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register now.</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

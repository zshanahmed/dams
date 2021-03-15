import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  Axios.defaults.withCredentials = true;

  const loginUser = () => {
    if (username && password) {
      Axios.post("http://localhost:5000/signin/", {
        username: username,
        password: password,
      }).then((response) => {
        console.log(response);
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setMessage("You are logged in as " + response.data[0].username);
        }
      });
    } else {
      setMessage("Please type username and password");
    }
  };

  return (
    <div className="AuthForm">
      <h2>Login</h2>
      <p>{message}</p>
      <div className="form-auth">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <button className="btn" onClick={loginUser}>
            Login
          </button>
        </div>
      </div>
      <p>
        Don't have an account?
        <span>
          <Link to="/register">Click here to create an account!</Link>
        </span>
      </p>
    </div>
  );
}

export default LoginForm;

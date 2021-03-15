import React, { useState } from "react";
import Axios from "axios";
import "./Auth.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const regUser = () => {
    if (username && password && confirmPassword) {
      if (password !== confirmPassword) {
        setError("Passwords not matching! Please try again");
      } else {
        console.log(username);
        Axios.post("http://localhost:5000/signup/", {
          username: username,
          password: password,
        }).then(() => {
          alert("Sucessfully signed up");
          window.location.reload();
        });
      }
    } else {
      setError("Username or password cannot be blank");
    }
  };

  return (
    <div className="AuthForm">
      <h2>Signup</h2>
      <div className="form-auth">
        <div className="form-group">
          <p>{error}</p>
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
          <label>Confirm Password</label>
          <input
            type="password"
            name="repeat-password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button className="btn" onClick={regUser}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;

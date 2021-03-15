import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Auth.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [mobile_num, setMobileNum] = useState("");
  const [sec_ans, setSecAns] = useState("");

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
          fName: fName,
          lastName: lastName,
          email: email,
          location: location,
          mobile_num: mobile_num,
          sec_ans: sec_ans,
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
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="fName"
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Security Answer</label>
          <input
            type="text"
            name="sec_ans"
            onChange={(e) => {
              setSecAns(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile_num"
            onChange={(e) => {
              setMobileNum(e.target.value);
            }}
          />
        </div>
        <button className="btn" onClick={regUser}>
          Submit
        </button>
        <p>
          Have an account already?
          <span>
            <Link to="/">Click here to Login!</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;

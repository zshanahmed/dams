/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import Axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [mobile_num, setMobileNum] = useState("");

  const [error, setError] = useState("");

  const regUser = () => {
    if (username && password && confirmPassword) {
      if (password !== confirmPassword) {
        setError("Passwords not matching! Please try again");
      } else {
        Axios.post("http://localhost:5000/signup/", {
          username: username,
          password: password,
          name: name,
          email: email,
          location: location,
          mobile_num: mobile_num,
        }).then((res) => {
          if (res.data.errno === 1062) {
            setError("Username already exists!");
          } else {
            alert("Sucessfully signed up");
            window.location.reload();
          }
        });
      }
    } else {
      setError("Username or password cannot be blank");
    }
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1>Register</h1>
              <p>{error}</p>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    name="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="confirm-new-password"
                    name="repeat-password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-pin-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Location"
                    type="text"
                    name="location"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-tablet-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mobile Number"
                    type="text"
                    name="mobile_num"
                    onChange={(e) => {
                      setMobileNum(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="mt-4 mb-2"
                  color="primary"
                  type="button"
                  onClick={regUser}
                >
                  Create account
                </Button>
                <p>
                  Already have an account?{" "}
                  <a href="/auth/login">Click here to login.</a>
                </p>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;

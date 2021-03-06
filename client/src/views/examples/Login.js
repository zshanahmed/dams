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
import { useHistory } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [logStatus, setLogStatus] = useState(false);
  const history = useHistory();
  const ac = new AbortController();

  Axios.defaults.withCredentials = true;

  const loginUser = () => {
    if (username && password) {
      Axios.post("http://localhost:5000/signin/", {
        username: username,
        password: password,
      }).then((response) => {
        if (!response.data.auth) {
          console.log(response)
          setLogStatus(false);
          setMessage(response.data.message);
        } else {
          console.log(response)
          var userInfo = response.data.result[0];
          var userRole = userInfo.role;
          console.log(userRole);
          delete userInfo['password']; // Deletes users' password from JSON array
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.result[0].username);
          localStorage.setItem("userData", JSON.stringify(userInfo));
          if (userRole === 'Admin') {
            history.push("/admin/index");
          } else if (userRole === 'Donor') {
            history.push("/donor/index");
          } else if (userRole === "Recipient") {
           history.push("/recipient/index");
          } else {
            history.push("/auth/login");
          }
          setLogStatus(true);
        }
      });
    } else {
      setMessage("Please type username and password");
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/signin").then(
        (response) => {
          if (localStorage.getItem("token")) {
            setLogStatus(true);}
        },
        (err) => console.log(err)
    );
    ac.abort();
  }, []);

  return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h1>Login</h1>
                <p>{message}</p>
              </div>
              <Form role="form" onSubmit={loginUser}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
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
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                  />
                  <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={loginUser}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col className="text-right">
              <span className="text-light m-2">Don't have an account?</span>
              <a
                  className="btn btn-primary p-2"
                  href="/auth/register"
                  // onClick={(e) => e.preventDefault()}
              >
                <strong>Click here</strong>
              </a>
            </Col>
          </Row>
        </Col>
      </>
  );
};

export default Login;
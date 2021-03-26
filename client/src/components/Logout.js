import { relativeTimeRounding } from "moment";
import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Logout = () => {
  const [navigate, setNavigate] = useState(false);
  const history = useHistory();

  const logout = () => {
    setNavigate(true);

    localStorage.clear("token");
  };

  if (navigate) {
    console.log("here");
    history.push("/");
  }
  return <Button onClick={logout}>Logout</Button>;
};

export default Logout;

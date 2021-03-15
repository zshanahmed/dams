import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Home from "./webpages/Home";
import DisasterPage from "./webpages/Disaster";
import AdminPage from "./webpages/Admin";
import Register from "./webpages/Register";
import Login from "./webpages/Login";

function App() {
  return (
    <div className="App">
      <Route exact path="/pledge" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Login} />
      <Route exact path="/disaster" component={DisasterPage} />
      <Route exact path="/admin" component={AdminPage} />
    </div>
  );
}

export default App;

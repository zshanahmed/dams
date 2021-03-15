import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <div className="Navbar">
      <h1>
        <Link to="/">
          <span>Disaster Assistance Management System</span>
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Signup</Link>
        </li>
        <li>
          <Link to="/pledge">Pledge</Link>
        </li>
        <li>
          <Link to="/disaster">Disaster</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

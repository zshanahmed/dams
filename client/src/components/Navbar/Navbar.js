import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
    return (
      <div className="Navbar">
          <h1><Link to="/">Disaster Assistance Management System</Link></h1>
          <Link to="/">Home</Link>
          <br />
          <Link to="/disaster">Disaster</Link>
      </div>
    );
  }
  
  export default Navbar;
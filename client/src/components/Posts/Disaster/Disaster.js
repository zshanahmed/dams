import React, { useEffect } from 'react';
import Axios from 'axios';

import './Disaster.css';

function Disaster() {

/*    useEffect(() => {
      Axios.get("http://localhost:5000/pledge/all").then((response) => {
        setResourceList(response.data)
      })
    }, [])
 */ 
    return (
      <div className="Disaster">
          <h3>This is a disaster item</h3>
      </div>
    );
  }
  
  export default Disaster;
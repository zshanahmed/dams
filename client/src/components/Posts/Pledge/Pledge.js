import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Pledge.css';

const Pledge = () => {
    const [resourceList, setResourceList] = useState([]);
  
    useEffect(() => {
      Axios.get("http://localhost:5000/pledge/all").then((response) => {
        setResourceList(response.data)
      })
    }, [])
  
    return (
      <div className="Pledge">
        {resourceList.map((val) => {
            return <h1>Donor: {val.donorName} | Resource: {val.resource}</h1>
        })}
      </div>
    );
  }
  
  export default Pledge;
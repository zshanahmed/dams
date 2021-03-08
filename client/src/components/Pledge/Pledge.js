import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Pledge.css';

const Pledge = () => {
    const [donorName, setDonorName] = useState('');
    const [resource, setResource] = useState('');
    const [resourceList, setResourceList] = useState([])
  
    useEffect(() => {
      Axios.get("http://localhost:5000/api/get").then((response) => {
        setResourceList(response.data)
      })
    }, [])
  
    const submitReview = () => {
      Axios.post("http://localhost:5000/api/insert", 
      {
        donorName: donorName, 
        resource: resource
      }).then(() => {
        alert('Sucessfully added');
      });
    };
  
    return (
      <div className="Pledge">
        <h1>Disaster Assistance Management System - Team 2</h1>
  
        <div className="form">
          <label>Donor</label>
          <input type="text" name="donorName" onChange={(e) => {
            setDonorName(e.target.value)
          }} />
          <label>Resource</label>
          <input type="text" name = "review" onChange={(e) => {
            setResource(e.target.value)
          }} />
          <button onClick={submitReview} >Submit</button>
  
          {resourceList.map((val) => {
            return <h1>Donor: {val.donorName} | Resource: {val.resource}</h1>
          })}
        </div>
      </div>
    );
  }
  
  export default Pledge;
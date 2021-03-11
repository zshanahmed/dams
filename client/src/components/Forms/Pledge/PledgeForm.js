import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './PledgeForm.css';

const PledgeForm = () => {
    const [donorName, setDonorName] = useState('');
    const [resource, setResource] = useState('');
    const [resourceList, setResourceList] = useState([])
  
    const submitReview = () => {
      Axios.post("http://localhost:5000/pledge/", 
      {
        donorName: donorName, 
        resource: resource
      }).then(() => {
        alert('Sucessfully added');
        window.location.reload();
      });
    };
  
    return (
        <div className="Pledge">
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
            </div>
        </div>
    );
  }
  
  export default PledgeForm;

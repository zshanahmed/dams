import React, { useState } from 'react';
import Axios from 'axios';
import './PledgeForm.css';

function PledgeForm() {
    const [donorName, setDonorName] = useState('');
    const [resource, setResource] = useState('');
  
    const submitReview = () => {
        if (donorName && resource){
            Axios.post("http://localhost:5000/pledge/", 
            {
                donorName: donorName, 
                resource: resource
            }).then(() => {
                alert('Sucessfully added');
                window.location.reload();
            });
        }
    };
  
    return (
        <div className="PledgeForm">
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

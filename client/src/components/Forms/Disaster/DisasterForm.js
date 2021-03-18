import React, { useState } from 'react';
import Axios from 'axios';
import './DisasterForm.css';

function DisasterForm() {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    
    const submitDisaster = () => {
        if (date && location && type){
            console.log(date);
            Axios.post("http://localhost:5000/disaster/", 
            {
                date: date, 
                location: location,
                type: type
            }).then(() => {
                alert('Sucessfully added');
                window.location.reload();
            });
        }
    };
  
    return (
        <div className="DisasterForm">
            <div className="form">
                <label>Disaster</label>
                <input type="text" name="type" onChange={(e) => {
                    setType(e.target.value)
                }} />
                <label>Location</label>
                <input type="text" name="location" onChange={(e) => {
                    setLocation(e.target.value)
                }} />
                <label>Date</label>
                <input type="date" name="date" onChange={(e) => {
                    setDate(e.target.value)
                }} />
                <button type="button" class="btn btn-secondary" onClick={submitDisaster}>Submit</button>
            </div>
        </div>
    );
  }
  
  export default DisasterForm;

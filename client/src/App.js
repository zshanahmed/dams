import React, { useState, useEffect } from 'react';
// import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import './App.css'
import Axios from 'axios';

import Posts from './components/Posts/Posts';

const App = () => {
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
    // <Container maxwidth="lg">
    //   <AppBar position="static" color="inherit">
    //     <Typography variant="h2" align="center">Serving webpage</Typography>
    //   </AppBar>
    // </Container>
    <div className="App">
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

export default App;

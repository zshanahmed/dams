import React, { useState, useEffect } from 'react';
// import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import './App.css'
import Axios from 'axios';

import Posts from './components/Posts/Posts';

const App = () => {
  const [donorName, setDonorName] = useState('');
  const [resource, setResource] = useState('');

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
      <h1>Disaster Assistance Management System</h1>

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

export default App;

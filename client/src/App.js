import React, { useState, useEffect } from 'react';
// import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import './App.css'
import Axios from 'axios';

import Posts from './components/Posts/Posts';

const App = () => {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');

  const submitReview = () => {
    Axios.post("http://localhost:5000/api/insert", 
    {
      movieName: movieName, 
      movieReview: movieReview
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
      <h1>CRUD Application</h1>

      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }} />
        <label>Review</label>
        <input type="text" name = "review" onChange={(e) => {
          setReview(e.target.value)
        }} />
        <button onClick={submitReview} >Submit</button>
      </div>
    </div>
    
  );
}

export default App;

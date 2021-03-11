import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Pledge from './components/Posts/Pledge/Pledge';
import PledgeForm from './components/Forms/Pledge/PledgeForm';

const App = () => {
  return (
    <Container maxwidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Disaster Assistance Managment System</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <PledgeForm />
          <Pledge />
        </Container>
      </Grow>
    </Container>
  );
}

export default App;

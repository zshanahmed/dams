import React from 'react';
import { Route } from 'react-router-dom';

import Home from './webpages/Home';
import Disaster from './components/Posts/Disaster/Disaster';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/disaster" component={Disaster} />
    </div>
  );
}

export default App;
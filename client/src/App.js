import React from 'react';
import { Route } from 'react-router-dom';

import Home from './webpages/Home';
import DisasterPage from './webpages/Disaster';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/disaster" component={DisasterPage} />
    </div>
  );
}

export default App;
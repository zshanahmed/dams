import React from 'react';
import { Route } from 'react-router-dom';

import Home from './webpages/Home';
import DisasterPage from './webpages/Disaster';
import AdminPage from './webpages/Admin';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/disaster" component={DisasterPage} />
      <Route exact path="/admin" component={AdminPage} />
    </div>
  );
}

export default App;
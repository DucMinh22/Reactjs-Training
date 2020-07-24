import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Homepage';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <HomePage />} />
    </Switch>
  );
}

export default App;

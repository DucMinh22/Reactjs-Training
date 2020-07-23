import React from 'react';
import 'antd/dist/antd.css';
import { Switch, Route } from 'react-router';
import HomePage from './HomePage';


function App() {
  return (
    <Switch>
      <Route path="/" render={() => <HomePage />} />
    </Switch>
  );
}

export default App;

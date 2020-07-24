import React from 'react';
import 'antd/dist/antd.css';
import HomePage from './HomePage';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Switch>
      <Route path="/" render={() => <HomePage />} />
    </Switch>
  );
}

export default App;
